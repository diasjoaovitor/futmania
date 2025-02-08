import { Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { formatCurrency } from '@/utils'
import { palette } from '@/themes'
import * as S from './style'

type Props = {
  caption: string
  value: number
  color: string
  icon: SvgIconComponent
}

export function WalletCard({ caption, color, icon: Icon, value }: Props) {
  return (
    <Box sx={{ ...S.Wrapper, borderColor: color }}>
      <div>
        <Typography variant="caption" color={palette.gray}>
          {caption}
        </Typography>
        <Typography variant="h5">{formatCurrency(value)}</Typography>
      </div>
      <Icon />
    </Box>
  )
}
