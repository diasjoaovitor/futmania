import { render, screen } from '@testing-library/react'
import { seasons } from '@/shared/states'
import { SelectSeason } from '.'

describe('<SelectSeason />', () => {
  it('should render the year in number and the season in extensive', () => {
    render(
      <SelectSeason
        season={seasons[1]}
        year={2024}
        years={[2023, 2024, 2025]}
        handleChange={jest.fn()}
      />
    )
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('Maio - Agosto')).toBeInTheDocument()
  })
})
