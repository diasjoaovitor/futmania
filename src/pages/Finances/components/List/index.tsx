import {
  Box,
  List as MuiList,
  ListItem as MuiListItem,
  Typography
} from '@mui/material'
import { TFinance } from '@/types'
import { ListItem } from './ListItem'
import * as S from './styles'

type TListProps = {
  finances: TFinance[]
  handleClick(finance: TFinance): void
}

export const List = ({ finances, handleClick }: TListProps) => {
  return (
    <Box sx={S.Wrapper}>
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
