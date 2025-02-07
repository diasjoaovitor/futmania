import { CSSObject, SxProps, Theme } from '@mui/material'

import * as GS from '@/styles'

export const Wrapper: SxProps<Theme> = {
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  p: 2,
  ...GS.FlexColumn
}

export const Paper: SxProps<Theme> = {
  my: 3,
  p: 2,
  textAlign: 'center',
  width: '100%',
  maxWidth: 400,
  h1: {
    textAlign: 'left',
    mb: 3,
    ...(GS.Title as CSSObject)
  }
}
