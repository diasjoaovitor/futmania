import {
  Box,
  List as MuiList,
  ListItem as MuiListItem,
  Typography
} from '@mui/material'

import { TFinanceModel } from '@/models'
import * as GS from '@/styles'
import { formatCurrency, formatDayNumMonthExtensive } from '@/utils'

import * as S from './styles'

type TListItemProps = {
  finance: TFinanceModel
  handleClick(finance: TFinanceModel): void
}

export const ListItem = ({ finance, handleClick }: TListItemProps) => {
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
          {formatDayNumMonthExtensive(date)}
        </Typography>
        <Typography variant="h6">{formatCurrency(Number(value))}</Typography>
      </Box>
    </MuiListItem>
  )
}

type TFinancesListProps = {
  finances: TFinanceModel[]
  handleClick(finance: TFinanceModel): void
}

export const List = ({ finances, handleClick }: TFinancesListProps) => {
  return (
    <Box sx={S.ListWrapper}>
      <Typography component="h2" variant="h6">
        Finanças do Mês
      </Typography>
      <MuiList>
        {finances.length > 0 ? (
          finances.map((finance) => (
            <ListItem
              key={finance.id}
              finance={finance}
              handleClick={handleClick}
            />
          ))
        ) : (
          <MuiListItem>Não há finanças registradas no mês</MuiListItem>
        )}
      </MuiList>
    </Box>
  )
}
