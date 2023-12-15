import { render, renderHook, screen, waitFor } from '@testing-library/react'
import { useQueryUser } from '@/shared/react-query'
import { TBabaUser } from '@/shared/types'
import { useAuth } from './useAuth'
import { AuthProvider } from '.'

jest.mock('../../react-query/queries/useQueryUser')

type TUseQueryUser = {
  data: TBabaUser | undefined
  isError: boolean
  isPending: boolean
}

const mockedUseQueryUser = useQueryUser as unknown as jest.Mock<TUseQueryUser>

function mockedUseUserSetup(args: TUseQueryUser | object) {
  const state: TUseQueryUser = {
    isPending: false,
    data: {
      id: '123',
      name: 'Baba'
    },
    isError: false
  }
  mockedUseQueryUser.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

describe('<AuthProvider />', () => {
  it('should render error message', async () => {
    mockedUseUserSetup({ data: undefined, isError: true })
    render(<AuthProvider />)
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível obter o usuário')
      ).toBeInTheDocument()
    })
  })

  it('should return default baba user', async () => {
    mockedUseUserSetup({})
    const {
      result: {
        current: { user, babaUser }
      }
    } = renderHook(() => useAuth())
    expect(user).toBe(null)
    await waitFor(() => {
      expect(babaUser).toEqual({ id: '123', name: 'Baba' })
    })
  })
})
