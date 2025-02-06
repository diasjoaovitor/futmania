import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { YearSelect } from '@/components'
import { months } from '@/constants'
import {
  formatMonthExtensive,
  formatStringWeekDayNumberMonthDay
} from '@/utils'

import * as S from './styles'

export type TYearMonthDaySelectProps = {
  year: number
  years: number[]
  month: number
  date: string
  dates: string[]
  handleChange(e: SelectChangeEvent): void
}

export const YearMonthDaySelect = ({
  year,
  years,
  month,
  date,
  dates,
  handleChange
}: TYearMonthDaySelectProps) => {
  return (
    <Box sx={S.YearMonthDaySelectWrapper} data-testid="select-year-month-day">
      <Select name="date" value={date} onChange={handleChange}>
        {dates.map((date) => (
          <MenuItem key={date} value={date}>
            {formatStringWeekDayNumberMonthDay(date)}
          </MenuItem>
        ))}
      </Select>
      <Select name="month" value={String(month)} onChange={handleChange}>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {formatMonthExtensive(month)}
          </MenuItem>
        ))}
      </Select>
      <YearSelect year={year} years={years} handleChange={handleChange} />
    </Box>
  )
}
