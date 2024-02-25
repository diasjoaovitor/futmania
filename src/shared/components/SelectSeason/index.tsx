import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import {
  getMonthExtensive,
  sortNumberDesc,
  sortStringDesc
} from '@/shared/functions'
import { seasons } from '@/shared/states'

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
