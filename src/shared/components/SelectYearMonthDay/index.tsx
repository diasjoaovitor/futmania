import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import {
  getMonthExtensive,
  getStringWeekDayNumberMonthDay,
  sortNumberDesc
} from '@/shared/functions'
import { months } from '@/shared/states'

type Props = {
  year: number
  years: number[]
  month: number
  date: string
  dates: string[]
  handleChange(e: SelectChangeEvent): void
}

export function SelectYearMonthDay({
  year,
  years,
  month,
  date,
  dates,
  handleChange
}: Props) {
  return (
    <Box data-testid="select-year-month-day">
      <Select name="date" value={date} onChange={handleChange}>
        {dates.map((date) => (
          <MenuItem key={date} value={date}>
            {getStringWeekDayNumberMonthDay(date)}
          </MenuItem>
        ))}
      </Select>
      <Select
        name="month"
        value={String(month)}
        onChange={handleChange}
        sx={{ mx: 1 }}
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
