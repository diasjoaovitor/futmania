import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

import { AuthProvider, NotificationProvider } from '@/contexts'
import { TSignUpParams } from '@/interfaces'
import { AuthService } from '@/services'
import { memoryRouter } from '@/tests'

import { SignUp } from '.'

const user: {
  emailVerified: boolean
} | null = null

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

jest.mock('@/services/auth')
jest.mock('@/services/user')

const mockedSignUp = jest.spyOn(AuthService.prototype, 'signUp')

const original = console.error

const signUpSetup = async ({ email, displayName, password }: TSignUpParams) => {
  await userEvent.type(screen.getByLabelText('Nome do Baba'), displayName)
  await userEvent.type(screen.getByLabelText('Email'), email)
  await userEvent.type(screen.getByLabelText('Senha'), password)
  await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/signin',
        element: null
      },
      {
        path: '/email-verification',
        element: null
      },
      {
        path: '/',
        element: null
      }
    ],
    {
      initialEntries: ['/signup']
    },
    (props: { children: ReactElement }) => (
      <AuthProvider>{props.children}</AuthProvider>
    )
  )

  return {
    router,
    Component: () => (
      <QueryClientProvider client={client}>
        <NotificationProvider>
          <Component />
        </NotificationProvider>
      </QueryClientProvider>
    )
  }
}

describe('<signUp />', () => {
  it('should navigate to signIn page', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: 'Entrar' }))
    })
    expect(router.state.location.pathname).toBe('/signin')
  })

  it('should signUp correctly', async () => {
    mockedSignUp.mockImplementation(() => Promise.resolve())
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(async () => {
      await signUpSetup({
        displayName: 'Test',
        email: 'test@test.com',
        password: '123456'
      })
    })
    expect(router.state.location.pathname).toBe('/')
  })

  it('should render error message', async () => {
    console.error = jest.fn()
    mockedSignUp.mockImplementation(() => {
      throw { code: 'auth/email-already-in-use' }
    })
    const { Component } = setup()
    render(<Component />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    await signUpSetup({
      displayName: 'Test',
      email: 'test@test.com',
      password: '123456'
    })
    expect(screen.getByText('Esse usuário já existe!')).toBeInTheDocument()
    console.error = original
  })
})
