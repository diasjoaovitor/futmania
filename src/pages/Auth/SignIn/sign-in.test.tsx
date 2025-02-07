import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TSignInParams } from '@/interfaces'
import { AuthService } from '@/services'
import { memoryRouter } from '@/tests'

import { SignIn } from '.'

jest.mock('@/services/auth')

const mockedSignIn = jest.spyOn(AuthService.prototype, 'signIn')

const signInSetup = async ({ email, password }: TSignInParams) => {
  await userEvent.type(screen.getByLabelText('Email'), email)
  await userEvent.type(screen.getByLabelText('Senha'), password)
  await userEvent.click(screen.getByRole('button', { name: 'SignIn' }))
}

const setup = () =>
  memoryRouter(
    [
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <></>
      },
      {
        path: '/',
        element: <></>
      }
    ],
    {
      initialEntries: ['/signin']
    }
  )

describe('<signIn />', () => {
  it('should navigate to signUp page', () => {
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(
      screen.getByRole('link', { name: 'Não tem uma conta? Cadastre-se' })
    )
    expect(router.state.location.pathname).toBe('/signup')
  })

  it('should navigate to reset-password page', () => {
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(
      screen.getByRole('link', { name: 'Esqueceu a senha? Recuperar' })
    )
    expect(router.state.location.pathname).toBe('/reset-password')
  })

  it('should signIn correctly', async () => {
    const { Component, router } = setup()
    render(<Component />)
    mockedSignIn.mockImplementation(() => Promise.resolve())
    await signInSetup({ email: 'test@test.com', password: '123456' })
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
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    await signInSetup({ email: 'test@test.com', password: '123456' })
    expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
  })
})
