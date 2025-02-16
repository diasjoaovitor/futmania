import {
  ArrowDownward,
  ArrowUpward,
  AttachMoney,
  SvgIconComponent
} from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

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
    <Box sx={{ ...S.CardWrapper, borderColor: color }}>
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

type TWalletProps = {
  incomes: number
  expenses: number
  balance: number
}

export const Wallet = ({ incomes, expenses, balance }: TWalletProps) => {
  return (
    <Box sx={S.WalletWrapper} data-testid="wallet">
      <WalletCard
        caption="Saldo em caixa"
        value={balance}
        color={balance >= 0 ? 'success.main' : 'warning.main'}
        icon={AttachMoney}
      />
      <WalletCard
        caption="Receitas do mês"
        value={incomes}
        color="primary.main"
        icon={ArrowUpward}
      />
      <WalletCard
        caption="Despesas do mês"
        value={expenses}
        color="error.main"
        icon={ArrowDownward}
      />
    </Box>
  )
}
