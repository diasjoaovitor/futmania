import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { sortNumberDesc } from '@/utils'

type TYearSelectProps = {
  year: number
  years: number[]
  handleChange(e: SelectChangeEvent): void
}

export const YearSelect = ({ year, years, handleChange }: TYearSelectProps) => {
  return (
    <Select name="year" value={String(year)} onChange={handleChange}>
      {sortNumberDesc(years.includes(year) ? years : [...years, year]).map(
        (year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        )
      )}
    </Select>
  )
}
