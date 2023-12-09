import { render, screen } from '@testing-library/react'
import { Finances } from '.'

describe('<Finances />', () => {
  it('should render the heading and main', () => {
    render(<Finances />)
    expect(
      screen.getByRole('heading', { name: /finanças/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('main').firstChild!.textContent).toBe(
      'Conteúdo de finanças'
    )
  })
})
