import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, waitFor } from '@testing-library/react'
import { ReactElement } from 'react'

import { TUserModel } from '@/models'
import {
  BabaService,
  FinanceService,
  MemberService,
  UserService
} from '@/services'
import { memoryRouter, mockedUser, mockedUsers } from '@/tests'
import { getLocalStorage } from '@/utils'

import { AuthProvider } from '../Auth'
import { AppProvider } from '.'

let user: {
  uid: string
  emailVerified: boolean
} | null = null

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

jest.mock('@/utils/local-storage')

const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')
const mockedFindAllBabas = jest.spyOn(BabaService.prototype, 'findAll')
const mockedFindAllFinances = jest.spyOn(FinanceService.prototype, 'findAll')
const mockedFindAllMembers = jest.spyOn(MemberService.prototype, 'findAll')

const mockedGetLocalStorage = getLocalStorage as jest.Mock<TUserModel | null>

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const setup = () => {
  const { router, Component } = memoryRouter(
    [
      {
        path: '/',
        element: null
      },
      {
        path: '/signin',
        element: null
      },
      {
        path: '/explorer',
        element: null
      }
    ],
    {
      initialEntries: ['/']
    },
    (props: { children: ReactElement }) => (
      <AuthProvider>
        <AppProvider>{props.children}</AppProvider>
      </AuthProvider>
    )
  )

  return {
    router,
    Component: () => (
      <QueryClientProvider client={client}>
        <Component />
      </QueryClientProvider>
    )
  }
}

describe('AppContext', () => {
  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
    mockedFindAllBabas.mockResolvedValue([])
    mockedFindAllFinances.mockResolvedValue([])
    mockedFindAllMembers.mockResolvedValue([])
  })

  it('should redirect to explorer page when user is not authenticated', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/explorer')
    })
  })

  it('should render home page when user is authenticated', async () => {
    user = { uid: '1', emailVerified: true }
    const { Component, router } = setup()
    await waitFor(() => {
      render(<Component />)
    })
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('should render the home page when the user is not authenticated but has a baba saved in local storage', async () => {
    user = null
    mockedGetLocalStorage.mockReturnValue(mockedUser)
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('should redirect to the signin page when there is no authentication and there is no baba created', async () => {
    user = null
    mockedFindAllUsers.mockResolvedValue([])
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/signin')
    })
  })
})
