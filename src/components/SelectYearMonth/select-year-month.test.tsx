import { render, screen } from '@testing-library/react'
import { SelectYearMonth } from '.'

describe('<SelectYearMonth />', () => {
  it('should render the year in number and the month in extensive', () => {
    render(
      <SelectYearMonth
        month={0}
        year={2024}
        years={[2023, 2024, 2025]}
        handleChange={jest.fn()}
      />
    )
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('Janeiro')).toBeInTheDocument()
  })
})
