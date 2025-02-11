import { Box, ListItem as MuiListItem, Typography } from '@mui/material'
import { formatCurrency, getDayNumMonthExtensive } from '@/utils'
import { TFinance } from '@/types'
import * as GS from '@/styles'

type ListItemProps = {
  finance: TFinance
  handleClick(finance: TFinance): void
}

export const ListItem = ({ finance, handleClick }: ListItemProps) => {
  const { description, value, date, type } = finance
  const state =
    type === '-'
      ? {
          caption: 'Despesa',
          color: 'error.main'
        }
      : {
          caption: 'Receita',
          color: 'primary.main'
        }
  const { caption, color } = state
  return (
    <MuiListItem
      sx={{
        ...GS.Li(color),
        justifyContent: 'space-between',
        gap: 1,
        cursor: 'pointer'
      }}
      onClick={() => handleClick(finance)}
    >
      <div>
        <Typography variant="caption" color="text.secondary">
          {caption}
        </Typography>
        <Typography>{description}</Typography>
      </div>
      <Box textAlign="right">
        <Typography variant="caption" color="text.secondary">
          {getDayNumMonthExtensive(date)}
        </Typography>
        <Typography variant="h6">{formatCurrency(Number(value))}</Typography>
      </Box>
    </MuiListItem>
  )
}
