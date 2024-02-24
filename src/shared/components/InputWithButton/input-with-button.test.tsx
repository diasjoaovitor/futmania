import { render, screen } from '@testing-library/react'
import { InputWithButton } from '.'

describe('<InputWithButton />', () => {
  it('should render the input and button', () => {
    render(
      <InputWithButton
        buttonProps={{ children: 'Save' }}
        inputProps={{ label: 'Sentence' }}
      />
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByLabelText('Sentence')).toBeInTheDocument()
  })
})
