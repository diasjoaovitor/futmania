import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@/shared/contexts'
import { useAuth as useAuthContext } from '@/shared/contexts/AuthContext/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TBabaUser } from '@/shared/types'
import { Stats } from '.'

jest.mock('../../shared/contexts/AuthContext/useAuth')

const client = new QueryClient()

type TUseAuthContext = {
  user: null
  babaUser: TBabaUser
  isLoading: boolean
}

const mockedUseAuthContext =
  useAuthContext as unknown as jest.Mock<TUseAuthContext>

function mockedUseAuthContextSetup(args: TUseAuthContext | object) {
  const state: TUseAuthContext = {
    isLoading: false,
    user: null,
    babaUser: {
      id: '123',
      name: 'Baba'
    }
  }
  mockedUseAuthContext.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

describe('<Stats />', () => {
  beforeEach(() => {
    mockedUseAuthContextSetup({})
  })

  it('should render the heading and main', () => {
    render(
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Stats />
        </AuthProvider>
      </QueryClientProvider>
    )
    expect(
      screen.getByRole('heading', { name: 'Estatísticas', level: 1 })
    ).toBeInTheDocument()
  })
})
