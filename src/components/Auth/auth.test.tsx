import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { User } from 'firebase/auth'
import { AuthProvider } from '@/contexts'
import { useAuth as useAuthContext } from '@/contexts/AuthContext/useAuth'
import { Auth } from '.'

jest.mock('../../contexts/AuthContext/useAuth')

const mockedUseAuthContext = useAuthContext as unknown as jest.Mock<{
  user: User | null
  isLoading: boolean
}>

function memoryRouter() {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Auth />
      },
      {
        path: '/entrar',
        element: <></>
      }
    ],
    {
      initialEntries: ['/']
    }
  )
  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
  return router
}

describe('<Auth />', () => {
  it('should render the login button', () => {
    mockedUseAuthContext.mockImplementation(() => ({
      user: null,
      isLoading: false
    }))
    memoryRouter()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should render the logout button', () => {
    mockedUseAuthContext.mockImplementation(() => ({
      user: { uid: '123abc' } as User,
      isLoading: false
    }))
    memoryRouter()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})
