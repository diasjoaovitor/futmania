import { render, waitFor } from '@testing-library/react'

import { memoryRouter } from '@/tests'

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

const setup = () =>
  memoryRouter(
    [
      {
        path: '/',
        element: <></>
      },
      {
        path: '/signin',
        element: <></>
      }
    ],
    {
      initialEntries: ['/']
    }
  )

describe('AppContext', () => {
  it('should redirect to signin page when user is not authenticated', async () => {
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/signin')
    })
  })

  it('should render home page when user is authenticated', async () => {
    user = { uid: '123', emailVerified: true }
    const { Component, router } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })
})
