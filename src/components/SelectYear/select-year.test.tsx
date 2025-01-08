import { render, screen } from '@testing-library/react'
import { SelectYear } from '.'

describe('<SelectYear />', () => {
  it('should render the heading', () => {
    render(
      <SelectYear year={2025} years={[2023, 2024]} handleChange={jest.fn()} />
    )
    expect(screen.getByText('2025')).toBeInTheDocument()
  })
})
