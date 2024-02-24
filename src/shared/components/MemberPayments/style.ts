import { SxProps, Theme } from '@mui/material'
import * as GS from '@/shared/styles'

export const PaymentItem: SxProps<Theme> = {
  ...GS.FlexRow,
  gap: 2,
  borderLeft: 1,
  my: 1,
  p: 0,
  pl: 1
}
