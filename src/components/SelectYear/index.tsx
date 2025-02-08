import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { sortNumberDesc } from '@/functions'

type Props = {
  year: number
  years: number[]
  handleChange(e: SelectChangeEvent): void
}

export function SelectYear({ year, years, handleChange }: Props) {
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
