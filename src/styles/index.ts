import { SxProps, Theme } from '@mui/material'

export const Title: SxProps<Theme> = {
  '&::after': {
    content: '""',
    width: 60,
    height: 8,
    display: 'block',
    backgroundColor: 'primary.dark'
  }
}

export const FlexRow: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1
}

export const FlexColumn: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2
}

export const Li = (borderColor?: string): SxProps<Theme> => ({
  borderLeft: '.5em solid',
  borderColor: borderColor || 'primary.dark',
  mb: 2
})
