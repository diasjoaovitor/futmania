import {
  Box,
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { TMember } from '@/types'
import * as GS from '@/styles'

type TListProps = {
  title: string
  members: TMember[]
  color: string
  handleClick(member: TMember): void
}

export const List = ({ title, members, color, handleClick }: TListProps) => {
  return (
    <Box>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      <MuiList>
        {members.map((member, index) => (
          <ListItem key={member.id} sx={{ ...GS.Li(color), pl: 0 }}>
            <ListItemButton onClick={() => handleClick(member)}>
              <ListItemText primary={`${index + 1} - ${member.name}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </MuiList>
    </Box>
  )
}
