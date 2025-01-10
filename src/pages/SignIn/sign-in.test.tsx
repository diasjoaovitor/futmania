import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthService } from '@/services'
import { memoryRouter } from '@/tests'
import { SignIn } from '.'
import { NotificationProvider } from '@/contexts'

jest.mock('@/services/auth')

const mockedSignIn = jest.spyOn(AuthService.prototype, 'signIn')

const client = new QueryClient()

const signInSetup = async (email: string, password: string) => {
  await userEvent.type(screen.getByLabelText('Email'), email)
  await userEvent.type(screen.getByLabelText('Senha'), password)
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
}

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/entrar',
        element: <SignIn />
      },
      {
        path: '/',
        element: <></>
      }
    ],
    {
      initialEntries: ['/entrar']
    }
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

describe('<signIn />', () => {
  it('should signIn correctly', async () => {
    const { Component, router } = setup()
    render(<Component />)
    mockedSignIn.mockImplementation(() => Promise.resolve())
    await waitFor(async () => {
      await signInSetup('test@test.com', '123456')
    })
    expect(router.state.location.pathname).toBe('/')
  })

  it('should signIn in as guest', () => {
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(
      screen.getByRole('link', { name: /Entrar como visitante/i })
    )
    expect(router.state.location.pathname).toBe('/')
  })

  it('should render error message', async () => {
    mockedSignIn.mockImplementation(() => {
      throw { code: 'auth/invalid-login-credentials' }
    })
    const { Component } = setup()
    render(<Component />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    })
    await waitFor(async () => {
      await signInSetup('test@test.com', '123456')
      expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
    })
  })
})
