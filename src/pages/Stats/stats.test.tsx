import { render, screen } from '@testing-library/react'
import { Stats } from '.'

describe('<Stats />', () => {
  it('should render the heading and main', () => {
    render(<Stats />)
    expect(
      screen.getByRole('heading', { name: /estatísticas/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('main').firstChild!.textContent).toBe(
      'Conteúdo de estatísticas'
    )
  })
})
