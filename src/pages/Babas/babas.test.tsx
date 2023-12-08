import { render, screen } from '@testing-library/react'
import { Babas } from '.'

describe('<Babas />', () => {
  it('should render the heading and main', () => {
    render(<Babas />)
    expect(screen.getByRole('heading', { name: /Babas/i })).toBeInTheDocument()
    expect(screen.getByRole('main').firstChild!.textContent).toBe(
      'Conteúdo de babas'
    )
  })
})
