import { fireEvent, render, screen } from '@testing-library/react'

import { ToggleExpandButton } from '.'

describe('<ToggleExpandButton />', () => {
  it('should render component its functionalities', () => {
    const handleClick = jest.fn()
    const { rerender } = render(
      <ToggleExpandButton isExpanded={false} handleClick={handleClick} />
    )
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Ver mais/i }))
    expect(handleClick).toHaveBeenCalled()

    rerender(<ToggleExpandButton isExpanded={true} handleClick={handleClick} />)
    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Ver menos/i }))
    expect(handleClick).toHaveBeenCalled()
  })
})
