import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { TMember } from '@/types'
import * as GS from '@/styles'

type TMembersListProps = {
  title: string
  members: TMember[]
  color: string
  handleClick(member: TMember): void
}

export const MembersList = ({
  title,
  members,
  color,
  handleClick
}: TMembersListProps) => {
  return (
    <Box>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      <List>
        {members.map((member, index) => (
          <ListItem key={member.id} sx={{ ...GS.Li(color), pl: 0 }}>
            <ListItemButton onClick={() => handleClick(member)}>
              <ListItemText primary={`${index + 1} - ${member.name}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
