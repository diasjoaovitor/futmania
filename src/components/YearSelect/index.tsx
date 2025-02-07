import { MenuItem, Select, SelectChangeEvent } from '@mui/material'

type TYearSelectProps = {
  year: number
  years: number[]
  handleChange(e: SelectChangeEvent): void
}

export const YearSelect = ({ year, years, handleChange }: TYearSelectProps) => {
  return (
    <Select name="year" value={String(year)} onChange={handleChange}>
      {[...years]
        .sort((a, b) => a - b)
        .map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
    </Select>
  )
}
