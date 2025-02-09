import { Box } from '@mui/material'
import { ArrowDownward, ArrowUpward, AttachMoney } from '@mui/icons-material'
import { WalletCard } from '..'
import * as S from './style'

type Props = {
  incomes: number
  expenses: number
  balance: number
}

export function Wallet({ incomes, expenses, balance }: Props) {
  return (
    <Box sx={S.Wrapper}>
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
