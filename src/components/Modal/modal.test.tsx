import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from '.'

describe('<Modal />', () => {
  it('should render component its functionalities', () => {
    const handleClose = jest.fn()
    render(
      <Modal title="Modal" isOpened={true} handleClose={handleClose}>
        <div>content</div>
      </Modal>
    )
    expect(screen.getByRole('heading', { name: /Modal/i })).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(handleClose).toHaveBeenCalled()
  })
})
