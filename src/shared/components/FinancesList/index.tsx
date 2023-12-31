import { Box, List, ListItem, Typography } from '@mui/material'
import { TFinance } from '@/shared/types'
import { FinancesListItem } from '..'
import * as S from './style'

type Props = {
  finances: TFinance[]
  handleClick(finance: TFinance): void
}

export function FinancesList({ finances, handleClick }: Props) {
  return (
    <Box sx={S.Wrapper}>
      <Typography component="h2" variant="h6">
        Finanças do Mês
      </Typography>
      <List>
        {finances.length > 0 ? (
          finances.map((finance) => (
            <FinancesListItem
              key={finance.id}
              finance={finance}
              handleClick={handleClick}
            />
          ))
        ) : (
          <ListItem>Não há finanças registradas no mês</ListItem>
        )}
      </List>
    </Box>
  )
}
