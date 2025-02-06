import { SxProps, Theme } from '@mui/material'

import * as GS from '@/styles'

export const Li: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 1
}

export const PaymentItem: SxProps<Theme> = {
  ...GS.FlexRow,
  gap: 2,
  borderLeft: 1,
  my: 1,
  p: 0,
  pl: 1
}
