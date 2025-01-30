import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TSignUpParams } from '@/interfaces'
import { AuthService } from '@/services'
import { memoryRouter } from '@/tests'

import { SignUp } from '.'

jest.mock('@/services/auth')

const mockedSignUp = jest.spyOn(AuthService.prototype, 'signUp')

const signUpSetup = async ({ email, name, password }: TSignUpParams) => {
  await userEvent.type(screen.getByLabelText('Nome do Baba'), name)
  await userEvent.type(screen.getByLabelText('Email'), email)
  await userEvent.type(screen.getByLabelText('Senha'), password)
  await userEvent.click(screen.getByRole('button', { name: 'SignUp' }))
}

const setup = () =>
  memoryRouter(
    [
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/signin',
        element: <></>
      },
      {
        path: '/verify-email',
        element: <></>
      }
    ],
    {
      initialEntries: ['/signup']
    }
  )

describe('<signUp />', () => {
  it('should navigate to signIn page', () => {
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(
      screen.getByRole('link', { name: 'Já tem uma conta? Entrar' })
    )
    expect(router.state.location.pathname).toBe('/signin')
  })

  it('should signUp correctly', async () => {
    const { Component, router } = setup()
    render(<Component />)
    mockedSignUp.mockImplementation(() => Promise.resolve())
    await signUpSetup({
      name: 'Test',
      email: 'test@test.com',
      password: '123456'
    })

    expect(router.state.location.pathname).toBe('/verify-email')
  })

  it('should signUp in as guest', () => {
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(
      screen.getByRole('link', { name: /Entrar como visitante/i })
    )
    expect(router.state.location.pathname).toBe('/')
  })

  it('should render error message', async () => {
    mockedSignUp.mockImplementation(() => {
      throw { code: 'auth/invalid-login-credentials' }
    })
    const { Component } = setup()
    render(<Component />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => {
      expect(screen.getByText('Email é obrigatório')).toBeInTheDocument()
    })
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument()
    await signUpSetup({
      name: 'Test',
      email: 'test@test.com',
      password: '123456'
    })

    expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
  })
})
