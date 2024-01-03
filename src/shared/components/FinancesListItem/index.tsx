import { Box, ListItem, Typography } from '@mui/material'
import { formatCurrency, getDayNumMonthExtensive } from '@/shared/functions'
import { TFinance } from '@/shared/types'
import { palette } from '@/shared/themes'
import * as GS from '@/shared/styles'

type Props = {
  finance: TFinance
  handleClick(finance: TFinance): void
}

export function FinancesListItem({ finance, handleClick }: Props) {
  const { description, value, date, type } = finance
  const state =
    type === '-'
      ? {
          caption: 'Despesa',
          color: palette.red
        }
      : {
          caption: 'Receita',
          color: palette.blue
        }
  const { caption, color } = state
  return (
    <ListItem
      sx={{
        ...GS.Li(color),
        justifyContent: 'space-between',
        gap: 1,
        cursor: 'pointer'
      }}
      onClick={() => handleClick(finance)}
    >
      <div>
        <Typography variant="caption" color="gray">
          {caption}
        </Typography>
        <Typography>{description}</Typography>
      </div>
      <Box textAlign="right">
        <Typography variant="caption" color="gray">
          {getDayNumMonthExtensive(date)}
        </Typography>
        <Typography variant="h6">{formatCurrency(Number(value))}</Typography>
      </Box>
    </ListItem>
  )
}
