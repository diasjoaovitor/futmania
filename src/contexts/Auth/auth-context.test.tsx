import { render, waitFor } from '@testing-library/react'

import { memoryRouter } from '@/tests'

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

const setup = () =>
  memoryRouter(
    [
      {
        path: '/',
        element: <></>
      },
      {
        path: '/email-verification',
        element: <></>
      }
    ],
    {
      initialEntries: ['/']
    }
  )

describe('AuthContext', () => {
  it('should redirect to email verification page when user is authenticated and email is not verified', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/email-verification')
    })
  })

  it('should render to home page when user is authenticated and email is verified', async () => {
    user = { emailVerified: true }
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('should render to home page when user is not authenticated', async () => {
    user = null
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })
})
