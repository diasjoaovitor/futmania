import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { YearSelect } from '@/components'
import { months } from '@/constants'
import { getMonthExtensive, getStringWeekDayNumberMonthDay } from '@/utils'

import * as S from './styles'

export type TYearMonthDaySelectProps = {
  year: number
  years: number[]
  month: number
  date: string
  dates: string[]
  handleYearChange(e: SelectChangeEvent): void
  handleMonthChange(e: SelectChangeEvent): void
  handleDateChange(e: SelectChangeEvent): void
}

export const YearMonthDaySelect = ({
  year,
  years,
  month,
  date,
  dates,
  handleYearChange,
  handleMonthChange,
  handleDateChange
}: TYearMonthDaySelectProps) => {
  return (
    <Box sx={S.YearMonthDaySelectWrapper} data-testid="year-month-day-select">
      <Select name="date" value={date} onChange={handleDateChange}>
        {dates.map((date) => (
          <MenuItem key={date} value={date}>
            {getStringWeekDayNumberMonthDay(date)}
          </MenuItem>
        ))}
      </Select>
      <Select name="month" value={String(month)} onChange={handleMonthChange}>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {getMonthExtensive(month)}
          </MenuItem>
        ))}
      </Select>
      <YearSelect year={year} years={years} handleChange={handleYearChange} />
    </Box>
  )
}
