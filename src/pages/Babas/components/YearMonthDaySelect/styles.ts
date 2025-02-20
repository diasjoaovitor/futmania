import { SxProps, Theme } from '@mui/material'

export const YearMonthDaySelectWrapper: SxProps<Theme> = {
  display: {
    xs: 'grid',
    sm: 'flex'
  },
  justifyContent: 'center',
  gap: 1,
  gridTemplateColumns: '1fr 1fr',
  '& > :nth-of-type(1)': {
    gridColumn: '1 / 3'
  }
}
