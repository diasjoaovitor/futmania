import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { useNavigate } from 'react-router'

import { useAppContext } from '@/contexts'
import { TUserModel } from '@/models'
import { getDayNumMonthExtensiveYearNum, setLocalStorage } from '@/utils'

import * as S from './styles'

type TListProps = {
  users: TUserModel[]
}

export const List = ({ users }: TListProps) => {
  const navigate = useNavigate()
  const { setBabaUser } = useAppContext()

  const handleClick = (user: TUserModel) => {
    setBabaUser(user)
    setLocalStorage('futmania_baba_user', user)
    navigate('/')
  }

  return (
    <MuiList sx={S.ListWrapper}>
      {[...users]
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .map((user) => (
          <ListItem
            key={user.id}
            sx={S.ListItem}
            dense
            onClick={() => handleClick(user)}
          >
            <ListItemButton>
              <ListItemText
                primary={user.displayName}
                secondary={`Criado em ${getDayNumMonthExtensiveYearNum(
                  user.createdAt
                )}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </MuiList>
  )
}
