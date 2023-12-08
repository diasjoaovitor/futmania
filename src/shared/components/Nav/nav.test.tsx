import { fireEvent, render, screen } from '@testing-library/react'
import { Nav } from '.'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

function memoryRouter() {
  const router = createMemoryRouter(
    [
      { path: '/other-page', element: <Nav /> },
      { path: '/', element: <Nav /> }
    ],
    {
      initialEntries: ['/other-page']
    }
  )
  render(<RouterProvider router={router} />)
  return router
}

describe('<Nav />', () => {
  it('should navigate to another page', () => {
    const router = memoryRouter()
    const navItems = screen.getAllByRole('button')
    expect(router.state.location.pathname).toBe('/other-page')
    const [babas] = navItems
    fireEvent.click(babas)
    expect(router.state.location.pathname).toBe('/')
  })
})
