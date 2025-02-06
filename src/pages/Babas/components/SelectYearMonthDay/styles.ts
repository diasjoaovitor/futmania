import { SxProps, Theme } from '@mui/material'

export const SelectYearMonthDayWrapper: SxProps<Theme> = {
  display: {
    xs: 'grid',
    sm: 'flex'
  },
  gap: 1,
  gridTemplateColumns: '1fr 1fr',
  '& > :nth-of-type(1)': {
    gridColumn: '1 / 3'
  }
}
