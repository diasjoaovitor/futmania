import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Login } from '.'
import { login } from '@/shared/firebase'

jest.mock('../../shared/firebase')

const mockedLogin = login as jest.Mock

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
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('should render error message', async () => {
    mockedLogin.mockImplementation(() => {
      throw { code: 'auth/invalid-login-credentials' }
    })
    memoryRouter()
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => {
      expect(screen.getByText('Email ou senha inválidos!')).toBeInTheDocument()
    })
  })

  it('should navigate to home', () => {
    const router = memoryRouter()
    fireEvent.click(
      screen.getByRole('link', { name: /Entrar como visitante/i })
    )
    expect(router.state.location.pathname).toBe('/')
  })
})
