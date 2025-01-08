import { fireEvent, render, screen } from '@testing-library/react'
import { Nav } from '.'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

function memoryRouter() {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Nav /> },
      { path: '/estatisticas', element: <Nav /> },
      { path: '/membros', element: <Nav /> },
      { path: '/financas', element: <Nav /> }
    ],
    {
      initialEntries: ['/']
    }
  )
  render(<RouterProvider router={router} />)
  return router
}

describe('<Nav />', () => {
  it('should navigate to another page', () => {
    const router = memoryRouter()
    const navItems = screen.getAllByRole('button')
    const [babas, stats, members, finances] = navItems
    fireEvent.click(finances)
    expect(router.state.location.pathname).toBe('/financas')
    fireEvent.click(members)
    expect(router.state.location.pathname).toBe('/membros')
    fireEvent.click(stats)
    expect(router.state.location.pathname).toBe('/estatisticas')
    fireEvent.click(babas)
    expect(router.state.location.pathname).toBe('/')
  })
})
