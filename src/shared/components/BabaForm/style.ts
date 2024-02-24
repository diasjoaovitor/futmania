import { SxProps, Theme } from '@mui/material'
import * as GS from '@/shared/styles'

export const Wrapper: SxProps<Theme> = {
  '.InputDate': {
    my: 2
  }
}

export const Member: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    maxWidth: 70,
    input: {
      textAlign: 'center'
    }
  }
}

export const SubHeader: SxProps<Theme> = {
  ...GS.FlexRow,
  justifyContent: 'space-between',
  p: 1,
  position: 'static'
}
