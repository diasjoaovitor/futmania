import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { getMonthExtensive, sortStringDesc } from '@/utils'
import { seasons } from '@/constants'
import { YearSelect } from '@/components'

type TSeasonSelectProps = {
  year: number
  years: number[]
  season: string
  handleChange(e: SelectChangeEvent): void
}

export const SeasonSelect = ({
  year,
  years,
  season,
  handleChange
}: TSeasonSelectProps) => {
  return (
    <Box data-testid="select-season">
      <Select
        name="season"
        value={season}
        onChange={handleChange}
        sx={{ mr: 1 }}
      >
        {sortStringDesc(seasons).map((season) => {
          const [monthFrom, monthTo] = season.split('-')
          return (
            <MenuItem key={season} value={season}>
              {`${getMonthExtensive(Number(monthFrom))} - ${getMonthExtensive(
                Number(monthTo)
              )}`}
            </MenuItem>
          )
        })}
      </Select>
      <YearSelect year={year} years={years} handleChange={handleChange} />
    </Box>
  )
}
