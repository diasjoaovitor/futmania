import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { YearSelect } from '@/components'
import { months } from '@/constants'
import { getMonthExtensive } from '@/utils'

export type TYearMonthSelectProps = {
  year: number
  years: number[]
  month: number
  handleMonthChange(e: SelectChangeEvent): void
  handleYearChange(e: SelectChangeEvent): void
}

export const YearMonthSelect = ({
  year,
  years,
  month,
  handleMonthChange,
  handleYearChange
}: TYearMonthSelectProps) => {
  return (
    <Box data-testid="year-month-select" sx={{ textAlign: 'center' }}>
      <Select
        name="month"
        value={String(month)}
        onChange={handleMonthChange}
        sx={{ mr: 1 }}
      >
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
