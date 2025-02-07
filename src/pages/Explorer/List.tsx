import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '@/contexts'
import { TUserModel } from '@/models'
import { formatDayNumMonthExtensiveYearNum } from '@/utils'

import * as S from './styles'

type TListProps = {
  users: TUserModel[]
}

export const List = ({ users }: TListProps) => {
  const navigate = useNavigate()
  const { setBabaUser } = useAppContext()

  const handleClick = (user: TUserModel) => {
    setBabaUser(user)
    navigate('/')
  }

  return (
    <MuiList sx={S.ListWrapper}>
      {users.length ? (
        users.map((user) => (
          <ListItem
            key={user.id}
            sx={S.ListItem}
            dense
            onClick={() => handleClick(user)}
          >
            <ListItemButton>
              <ListItemText
                primary={user.name}
                secondary={`Criado em ${formatDayNumMonthExtensiveYearNum(
                  user.createdAt
                )}`}
              />
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="Ainda não há existe nenhum Baba criado" />
        </ListItem>
      )}
    </MuiList>
  )
}
