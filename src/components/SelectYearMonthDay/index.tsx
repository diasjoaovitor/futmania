import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import {
  getMonthExtensive,
  getStringWeekDayNumberMonthDay,
  sortNumberDesc
} from '@/utils'
import { months } from '@/states'
import { SelectYear } from '../SelectYear'

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
      <SelectYear year={year} years={years} handleChange={handleChange} />
    </Box>
  )
}
