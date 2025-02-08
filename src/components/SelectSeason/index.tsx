import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { getMonthExtensive, sortStringDesc } from '@/utils'
import { seasons } from '@/constants'
import { SelectYear } from '../SelectYear'

type Props = {
  year: number
  years: number[]
  season: string
  handleChange(e: SelectChangeEvent): void
}

export function SelectSeason({ year, years, season, handleChange }: Props) {
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
      <SelectYear year={year} years={years} handleChange={handleChange} />
    </Box>
  )
}
