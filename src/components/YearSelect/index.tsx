import { MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { getDistinctValues, sortNumberDesc } from '@/utils'

type TYearSelectProps = {
  year: number
  years: number[]
  handleChange(e: SelectChangeEvent): void
}

export const YearSelect = ({ year, years, handleChange }: TYearSelectProps) => {
  return (
    <Select name="year" value={String(year)} onChange={handleChange}>
      {sortNumberDesc(getDistinctValues<number>([...years, year])).map(
        (year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        )
      )}
    </Select>
  )
}
