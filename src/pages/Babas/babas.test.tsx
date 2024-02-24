import { render, screen } from '@testing-library/react'
import { Babas } from '.'
import { TBaba, TBabaUser, TMember } from '@/shared/types'
import { useAuth as useAuthContext } from '@/shared/contexts/AuthContext/useAuth'
import { useQueriesMembersAndBabasAndFinances } from '@/shared/react-query'
import { AuthProvider } from '@/shared/contexts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('../../shared/contexts/AuthContext/useAuth')
jest.mock(
  '../../shared/react-query/queries/useQueriesMembersAndBabasAndFinances'
)

const mockedMembers: TMember[] = []

const mockedBabas: TBaba[] = []

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

type TUseQueriesMembersAndBabas = {
  membersData: TMember[] | undefined
  membersIsPending: boolean
  isMembersError: boolean
  babasData: TBaba[] | undefined
  babasIsPending: boolean
  isBabasError: boolean
}

const mockedUseQueriesMembersAndBabasAndFinances =
  useQueriesMembersAndBabasAndFinances as unknown as jest.Mock<TUseQueriesMembersAndBabas>

function mockedUseQueriesMembersAndBabasAndFinancesSetup(
  args: TUseQueriesMembersAndBabas | object
) {
  const state: TUseQueriesMembersAndBabas = {
    membersData: mockedMembers,
    membersIsPending: false,
    isMembersError: false,
    babasData: mockedBabas,
    babasIsPending: false,
    isBabasError: false
  }
  mockedUseQueriesMembersAndBabasAndFinances.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

const client = new QueryClient()

describe('<Babas />', () => {
  beforeEach(() => {
    mockedUseAuthContextSetup({})
    mockedUseQueriesMembersAndBabasAndFinancesSetup({})
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
