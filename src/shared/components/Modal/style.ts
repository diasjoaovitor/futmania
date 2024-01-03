import { CSSObject, SxProps, Theme } from '@mui/material'
import { palette } from '@/shared/themes'
import * as GS from '@/shared/styles'

export const Wrapper: SxProps<Theme> = {
  p: 2,
  alignItems: 'center',
  justifyContent: 'center',
  ...GS.FlexColumn
}

export const Content: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'background.paper',
  backgroundColor: palette.black,
  p: 3,
  width: '100%',
  maxWidth: 600,
  overflow: 'auto'
}

export const Header: SxProps<Theme> = {
  h2: GS.Title as CSSObject,
  justifyContent: 'space-between',
  mb: 2,
  ...GS.FlexRow
}
