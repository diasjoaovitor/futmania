import { SxProps, Theme } from '@mui/material'
import * as GS from '@/styles'

export const Wrapper: SxProps<Theme> = {
  ...GS.FlexRow,
  borderLeft: '.5em solid',
  justifyContent: 'space-between',
  p: 1,
  mb: 1,
  svg: {
    fontSize: '3.2em'
  }
}
