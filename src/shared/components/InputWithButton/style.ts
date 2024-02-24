import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: 1,
  button: {
    maxWidth: 120
  }
}
