import { render, waitFor } from '@testing-library/react'
import { ReactElement } from 'react'

import { UserService } from '@/services'
import { memoryRouter, mockedUsers } from '@/tests'

import { AuthProvider } from '.'

jest.mock('@/services/user')

let user: {
  emailVerified: boolean
} | null = { emailVerified: false }

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')

const setup = () =>
  memoryRouter(
    [
      {
        path: '/',
        element: null
      },
      {
        path: '/email-verification',
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
      <AuthProvider>{props.children}</AuthProvider>
    )
  )

describe('AuthContext', () => {
  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
  })

  it('should redirect to email verification page when user is authenticated and email is not verified', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/email-verification')
    })
  })

  it('should redirect to the home page when the user is authenticated and the email is verified', async () => {
    user = { emailVerified: true }
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('should redirect to the home page when the user is not authenticated', async () => {
    user = null
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })
})
