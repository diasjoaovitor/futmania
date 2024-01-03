import { CSSObject, SxProps, Theme } from '@mui/material'
import * as GS from '@/shared/styles'

export const Wrapper: SxProps<Theme> = {
  mt: 2,
  h2: {
    mb: 2,
    ...(GS.Title as CSSObject)
  }
}
