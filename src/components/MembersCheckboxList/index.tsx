import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  Typography
} from '@mui/material'
import { ChangeEvent } from 'react'

import * as GS from '@/styles'
import { TFinance, TMember } from '@/types'
import { someFinanceIncludesMember, sortMembersByName } from '@/utils'

import { memberIsChecked } from './utils'

type Props = {
  title: string
  members: TMember[]
  checkedMembers: string[]
  disabledMembers?: string[]
  finances: TFinance[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
}

export function MembersCheckboxList({
  title,
  members,
  checkedMembers,
  disabledMembers,
  finances,
  handleChange
}: Props) {
  return (
    <List>
      <Typography component="h3" variant="h6" mb={2}>
        {title}
      </Typography>
      {sortMembersByName(members).map((member) => (
        <ListItem
          key={member.id}
          sx={GS.Li(
            !someFinanceIncludesMember(finances, member.id as string)
              ? 'error.main'
              : 'primary.main'
          )}
        >
          <ListItemButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={memberIsChecked(checkedMembers, member.id as string)}
                  value={member.id}
                  onChange={handleChange}
                  disabled={
                    disabledMembers &&
                    memberIsChecked(disabledMembers, member.id as string)
                  }
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
