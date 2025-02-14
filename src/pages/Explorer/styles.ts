import { SxProps, Theme } from '@mui/material'

export const ListWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
}

export const ListItem: SxProps<Theme> = {
  border: 1,
  borderRadius: 1,
  borderColor: 'primary.light'
}
