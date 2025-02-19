import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import { YearSelect } from '@/components'
import { seasons } from '@/constants'
import { getMonthExtensive } from '@/utils'

type TSeasonSelectProps = {
  year: number
  years: number[]
  season: string
  handleYearChange(e: SelectChangeEvent): void
  handleSeasonChange(e: SelectChangeEvent): void
}

export const SeasonSelect = ({
  year,
  years,
  season,
  handleSeasonChange,
  handleYearChange
}: TSeasonSelectProps) => {
  return (
    <Box data-testid="season-select">
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
              {`${getMonthExtensive(Number(monthFrom))} - ${getMonthExtensive(Number(monthTo))}`}
            </MenuItem>
          )
        })}
      </Select>
      <YearSelect year={year} years={years} handleChange={handleYearChange} />
    </Box>
  )
}
