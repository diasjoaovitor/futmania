import { SxProps, Theme } from '@mui/material'
import { palette } from '../themes'

export const Title: SxProps<Theme> = {
  '&::after': {
    content: '""',
    width: 60,
    height: 8,
    display: 'block',
    backgroundColor: palette.darkBlue
  }
}

export const FlexRow: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1
}

export const FlexColumn: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column'
}

export function Li(borderColor?: string): SxProps<Theme> {
  return {
    borderLeft: '.5em solid',
    borderColor: borderColor || palette.darkBlue,
    mb: 2
  }
}
