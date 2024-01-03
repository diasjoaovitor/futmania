import { ChangeEvent } from 'react'
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Typography
} from '@mui/material'
import { palette } from '@/shared/themes'
import { TFinance, TMember } from '@/shared/types'
import { someFinanceIncludesMember } from '@/shared/functions'
import { memberIsChecked } from './functions'
import * as GS from '@/shared/styles'

type Props = {
  title: string
  members: TMember[]
  checkedMembers: string[]
  finances: TFinance[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export function MembersCheckboxList({
  title,
  members,
  checkedMembers,
  finances,
  handleChange
}: Props) {
  return (
    <List>
      <Typography component="h3" variant="h6" mb={2}>
        {title}
      </Typography>
      {members.map((member) => (
        <ListItem
          key={member.id}
          sx={GS.Li(
            !someFinanceIncludesMember(finances, member.id as string)
              ? palette.red
              : palette.blue
          )}
        >
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={memberIsChecked(checkedMembers, member.id as string)}
                  value={member.id}
                  onChange={handleChange}
                />
              }
              label={member.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
