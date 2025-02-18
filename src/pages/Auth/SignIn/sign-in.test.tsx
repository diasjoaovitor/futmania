import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

import { AuthProvider, NotificationProvider } from '@/contexts'
import { TSignInParams } from '@/interfaces'
import { AuthService } from '@/services'
import { memoryRouter } from '@/tests'

import { SignIn } from '.'

jest.mock('@/services/auth')

const mockedSignIn = jest.spyOn(AuthService.prototype, 'signIn')

const original = console.error

const signInSetup = async ({ email, password }: TSignInParams) => {
  await userEvent.type(screen.getByLabelText('Email'), email)
  await userEvent.type(screen.getByLabelText('Senha'), password)
  await userEvent.click(screen.getByRole('button', { name: 'SignIn' }))
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
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: null
      },
      {
        path: '/forgot-password',
        element: null
      },
      {
        path: '/explorer',
        element: null
      },
      {
        path: '/',
        element: null
      }
    ],
    {
      initialEntries: ['/signin']
    },
    (props: { children: ReactElement }) => (
      <AuthProvider>{props.children}</AuthProvider>
    )
  )

  return {
    router,
    Component: () => (
      <NotificationProvider>
        <QueryClientProvider client={client}>
          <Component />
        </QueryClientProvider>
      </NotificationProvider>
    )
  }
}

describe('<SignIn />', () => {
  it('should navigate to sign-up page', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: 'Cadastre-se' }))
    })
    expect(router.state.location.pathname).toBe('/signup')
  })

  it('should navigate to reset-password page', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: 'Recuperar' }))
    })
    expect(router.state.location.pathname).toBe('/forgot-password')
  })

  it('should sign-in correctly', async () => {
    mockedSignIn.mockResolvedValue()
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(async () => {
      await signInSetup({ email: 'test@test.com', password: '123456' })
    })
    expect(router.state.location.pathname).toBe('/')
  })

  it('should navigate to explorer page', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(screen.getByRole('link', { name: /Explorar Babas/i }))
    })
    expect(router.state.location.pathname).toBe('/explorer')
  })

  it('should render error message', async () => {
    console.error = jest.fn()
    mockedSignIn.mockImplementation(() => {
      throw { code: 'auth/invalid-login-credentials' }
    })
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.submit(screen.getByRole('form'))
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    await signInSetup({ email: 'test@test.com', password: '123456' })
    expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
    console.error = original
  })
})
