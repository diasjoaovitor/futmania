import { CSSObject, SxProps, Theme } from '@mui/material'
import * as GS from '@/styles'

export const Wrapper: SxProps<Theme> = {
  display: {
    md: 'flex'
  },
  height: '100vh'
}

export const Content: SxProps<Theme> = {
  p: 2,
  overflow: 'auto',
  h1: {
    mb: 3,
    ...(GS.Title as CSSObject)
  },
  flex: 1
}

export const AppBarWrapper: SxProps<Theme> = {
  position: 'static',
  backgroundImage: 'none',
  boxShadow: 'none'
}

export const Opened: SxProps<Theme> = {
  height: '100vh',
  position: {
    md: 'static'
  },
  width: 260,
  left: 0,
  backgroundImage: 'background.paper'
}

export const NavWrapper: SxProps<Theme> = {
  flex: 1,
  py: 2,
  a: {
    textDecoration: 'none',
    color: 'inherit'
  },
  '& .MuiListItemButton-root': {
    ...(GS.FlexRow as CSSObject)
  },
  '& > div:last-of-type': {
    hr: {
      my: 1
    }
  },
  justifyContent: 'space-between',
  ...GS.FlexColumn
}
