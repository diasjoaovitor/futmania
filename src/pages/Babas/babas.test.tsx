import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TBaba, TBabaUser, TFinance, TMember } from '@/types'
import { useAuth as useAuthContext } from '@/contexts/AuthContext/useAuth'
import { AuthProvider } from '@/contexts'
import { getBabas, getFinances, getMembers } from '@/firebase'
import { Babas } from '.'

jest.mock('@/contexts/AuthContext/useAuth')
jest.mock('@/firebase')

const mockedGetMembers = getMembers as jest.Mock<Promise<TMember[]>>
const mockedGetBabas = getBabas as jest.Mock<Promise<TBaba[]>>
const mockedGetFinances = getFinances as jest.Mock<Promise<TFinance[]>>

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

const client = new QueryClient()

describe('<Babas />', () => {
  beforeEach(() => {
    mockedUseAuthContextSetup({})
    mockedGetMembers.mockImplementation(() => Promise.resolve([]))
    mockedGetBabas.mockImplementation(() => Promise.resolve([]))
    mockedGetFinances.mockImplementation(() => Promise.resolve([]))
  })

  it('should render the heading', () => {
    render(
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Babas />
        </AuthProvider>
      </QueryClientProvider>
    )
    expect(
      screen.getByRole('heading', { name: 'Babas', level: 1 })
    ).toBeInTheDocument()
  })
})
