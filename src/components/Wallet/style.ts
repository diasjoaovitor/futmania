import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  display: {
    md: 'grid'
  },
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: {
    md: 1,
    lg: 2
  }
}
