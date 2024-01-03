import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { getMonthExtensive, sortNumberDesc } from '@/shared/functions'
import { months } from '@/shared/states'

type Props = {
  year: number
  years: number[]
  month: number
  handleChange(e: SelectChangeEvent): void
}

export function SelectYearMonth({ year, years, month, handleChange }: Props) {
  return (
    <Box data-testid="select-year-month">
      <Select
        name="month"
        value={String(month)}
        onChange={handleChange}
        sx={{ mr: 1 }}
      >
        {sortNumberDesc(months).map((month) => (
          <MenuItem key={month} value={month}>
            {getMonthExtensive(month)}
          </MenuItem>
        ))}
      </Select>
      <Select name="year" value={String(year)} onChange={handleChange}>
        {sortNumberDesc(years).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
