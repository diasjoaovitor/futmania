import { render, screen } from '@testing-library/react'
import { Members } from '.'

describe('<Members />', () => {
  it('should render the heading and main', () => {
    render(<Members />)
    expect(
      screen.getByRole('heading', { name: /membros/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('main').firstChild!.textContent).toBe(
      'Conteúdo de membros'
    )
  })
})
