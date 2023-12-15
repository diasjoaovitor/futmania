import { SxProps, Theme } from '@mui/material'

export const Title: SxProps<Theme> = {
  '&::after': {
    content: '""',
    width: 60,
    height: 8,
    display: 'block',
    backgroundColor: '#42a5f5'
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

export const ButtonGrid: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  gap: 1,
  button: {
    maxWidth: 120
  }
}

export function Li(borderColor: string): SxProps<Theme> {
  return {
    borderLeft: '.5em solid',
    borderColor,
    mb: 2
  }
}
