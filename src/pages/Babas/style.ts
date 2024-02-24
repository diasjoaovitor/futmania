import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  maxWidth: 900
}

export const ButtonsGrid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 1,
  my: 2
}
