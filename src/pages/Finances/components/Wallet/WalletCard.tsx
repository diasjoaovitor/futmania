import { Box, Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import { formatCurrency } from '@/utils'
import * as S from './styles'

type TWalletCardProps = {
  caption: string
  value: number
  color: string
  icon: SvgIconComponent
}

export const WalletCard = ({
  caption,
  color,
  icon: Icon,
  value
}: TWalletCardProps) => {
  return (
    <Box sx={{ ...S.WalletCardWrapper, borderColor: color }}>
      <div>
        <Typography variant="caption" color="text.secondary">
          {caption}
        </Typography>
        <Typography variant="h5">{formatCurrency(value)}</Typography>
      </div>
      <Icon />
    </Box>
  )
}
