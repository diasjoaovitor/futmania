import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { SelectYear } from '@/components'
import { seasons } from '@/constants'
import { formatMonthExtensive } from '@/utils'

type TSelectSeasonProps = {
  year: number
  years: number[]
  season: string
  handleYearChange(e: SelectChangeEvent): void
  handleSeasonChange(e: SelectChangeEvent): void
}

export const SelectSeason = ({
  year,
  years,
  season,
  handleSeasonChange,
  handleYearChange
}: TSelectSeasonProps) => {
  return (
    <Box data-testid="select-season">
      <Select
        name="season"
        value={season}
        onChange={handleSeasonChange}
        sx={{ mr: 1 }}
      >
        {seasons.map((season) => {
          const [monthFrom, monthTo] = season.split('-')
          return (
            <MenuItem key={season} value={season}>
              {`${formatMonthExtensive(Number(monthFrom))} - ${formatMonthExtensive(Number(monthTo))}`}
            </MenuItem>
          )
        })}
      </Select>
      <SelectYear year={year} years={years} handleChange={handleYearChange} />
    </Box>
  )
}
