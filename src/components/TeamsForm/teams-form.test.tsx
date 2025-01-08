import { render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { TeamsForm } from '.'

function Component({ handleSubmit }: { handleSubmit(): void }) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <TeamsForm
            finances={[]}
            members={[]}
            isOpened={true}
            handleClose={jest.fn()}
            handleSubmit={handleSubmit}
          />
        )
      }
    ],
    {
      initialEntries: ['/']
    }
  )
  return <RouterProvider router={router} />
}

describe('<TeamsForm />', () => {
  it('should render the heading', () => {
    const handleSubmit = jest.fn()
    render(<Component handleSubmit={handleSubmit} />)
    expect(
      screen.getByRole('heading', { name: 'Montar Times', level: 2 })
    ).toBeInTheDocument()
  })
})
