import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { YearSelect } from '@/components'
import { months } from '@/constants'
import { getMonthExtensive, sortNumberDesc } from '@/utils'

type TYearMonthSelectProps = {
  year: number
  years: number[]
  month: number
  handleChange(e: SelectChangeEvent): void
}

export const YearMonthSelect = ({
  year,
  years,
  month,
  handleChange
}: TYearMonthSelectProps) => {
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
      <YearSelect year={year} years={years} handleChange={handleChange} />
    </Box>
  )
}
