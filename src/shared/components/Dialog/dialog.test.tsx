import { fireEvent, render, screen } from '@testing-library/react'
import { Dialog } from '.'

describe('<Dialog />', () => {
  it('should render component and its functionalities', () => {
    const handleAccept = jest.fn()
    const handleClose = jest.fn()
    render(
      <Dialog
        title="Dialog"
        isOpened={true}
        handleAccept={handleAccept}
        handleClose={handleClose}
      />
    )
    expect(screen.getByRole('heading', { name: /Dialog/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Sim/i }))
    expect(handleAccept).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /Não/i }))
    expect(handleClose).toHaveBeenCalled()
  })
})
