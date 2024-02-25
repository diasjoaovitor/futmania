import { render, screen } from '@testing-library/react'
import { SelectYearMonthDay } from '.'

describe('<SelectYearMonthDay />', () => {
  it('should render the year in number and the month in extensive', () => {
    render(
      <SelectYearMonthDay
        month={0}
        year={2024}
        years={[2023, 2024, 2025]}
        date="2024-01-14"
        dates={['2024-01-07', '2024-01-14', '2024-01-21', '2024-01-28']}
        handleChange={jest.fn()}
      />
    )
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('Janeiro')).toBeInTheDocument()
  })
})
