import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { login } from '@/firebase'
import { Login } from '.'

jest.mock('../../shared/firebase/auth')

const mockedLogin = login as jest.Mock

async function loginSetup(email: string, password: string) {
  await userEvent.type(screen.getByLabelText('Email *'), email)
  await userEvent.type(screen.getByLabelText('Senha *'), password)
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
}

const client = new QueryClient()

function memoryRouter() {
  const router = createMemoryRouter(
    [
      {
        path: '/entrar',
        element: <Login />
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
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
  return router
}

describe('<Login />', () => {
  it('should login correctly', async () => {
    mockedLogin.mockImplementation(() => Promise.resolve())
    const router = memoryRouter()
    await loginSetup('test@test.com', '123456')
    expect(router.state.location.pathname).toBe('/')
  })

  it('should login in as guest', () => {
    const router = memoryRouter()
    fireEvent.click(
      screen.getByRole('link', { name: /Entrar como visitante/i })
    )
    expect(router.state.location.pathname).toBe('/')
  })

  it('should render error message', async () => {
    mockedLogin.mockImplementation(() => {
      throw { code: 'auth/invalid-login-credentials' }
    })
    memoryRouter()
    fireEvent.submit(screen.getByRole('form'))
    expect(
      screen.getByText('Todos os campos devem ser preenchidos!')
    ).toBeInTheDocument()
    await loginSetup('test@test.com', '123456')
    expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
  })
})
