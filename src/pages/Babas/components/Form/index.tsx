import { useComponentHandler } from './use-component-handler'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  TextField,
  Typography
} from '@mui/material'
import { DateInput, MembersCheckboxListModal, Modal } from '@/components'
import { TBaba, TMember } from '@/types'
import { getMemberById, handleFocus } from '@/utils'
import * as S from './styles'

export type TFormProps = {
  isOpened: boolean
  baba: TBaba
  members: TMember[]
  handleClose(): void
  handleUpdate(baba: TBaba): void
}

export const Form = ({
  isOpened,
  baba: b,
  members,
  handleClose,
  handleUpdate
}: TFormProps) => {
  const {
    baba,
    member,
    handleDateChange,
    handleAddMemberClick,
    handleMemberClick,
    handleMemberChange,
    handleChange,
    modalIsOpened: membersModalIsOpened,
    handleCloseMembersModal
  } = useComponentHandler({ baba: b, isOpened })

  const { teams, date } = baba

  const disabledMembers: string[] = []
  teams.forEach(({ members }) => {
    members.forEach(
      ({ memberId }) => memberId !== member[1] && disabledMembers.push(memberId)
    )
  })
  return (
    <Modal title="Editar Baba" isOpened={isOpened} handleClose={handleClose}>
      <Box sx={S.Wrapper}>
        <DateInput date={date} handleChange={handleDateChange} />
        {teams.map(({ name, members: mbs, draws, wins }, teamIndex) => (
          <List key={teamIndex}>
            <ListSubheader sx={S.SubHeader}>
              <Typography>{name}</Typography>
              <Typography>Gols</Typography>
            </ListSubheader>
            {mbs.map(({ memberId, goals }, memberIndex) => {
              const member = getMemberById(members, memberId)
              return (
                <ListItem key={memberId} sx={S.Member} disablePadding>
                  <ListItemButton
                    sx={{ py: 1 }}
                    onClick={() => handleMemberClick(member?.id as string)}
                  >
                    <ListItemText primary={`${member?.name}`} />
                  </ListItemButton>
                  <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, teamIndex, memberIndex)
                    }
                    value={goals}
                    type="number"
                    inputProps={{ min: 0 }}
                    size="small"
                    onFocus={handleFocus}
                  />
                </ListItem>
              )
            })}
            <ListItem disablePadding sx={{ my: 2 }}>
              <Button onClick={() => handleAddMemberClick(teamIndex)}>
                Adicionar Membro
              </Button>
            </ListItem>
            <ListItem disablePadding sx={{ mb: 2 }}>
              <TextField
                name="wins"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, teamIndex, null)
                }
                label="Vitórias"
                value={wins}
                type="number"
                inputProps={{ min: 0 }}
                sx={{ mr: 1 }}
                onFocus={handleFocus}
              />
              <TextField
                name="draws"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, teamIndex, null)
                }
                label="Empates"
                value={draws}
                type="number"
                inputProps={{ min: 0 }}
                onFocus={handleFocus}
              />
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </List>
        ))}
        <Button
          variant="contained"
          fullWidth
          onClick={() => handleUpdate(baba)}
        >
          Salvar
        </Button>
        <MembersCheckboxListModal
          isOpened={membersModalIsOpened}
          title="Selecionar Membro"
          members={members}
          checkedMembers={member[1] ? [member[1]] : []}
          disabledMembers={disabledMembers}
          finances={[]}
          handleChange={handleMemberChange}
          handleClose={handleCloseMembersModal}
        />
      </Box>
    </Modal>
  )
}
