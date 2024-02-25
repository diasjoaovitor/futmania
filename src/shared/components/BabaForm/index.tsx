import { useBabaForm } from './useBabaForm'
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
import { TBaba, TMember } from '@/shared/types'
import { getMemberById, handleFocus } from '@/shared/functions'
import { InputDate, MembersCheckboxListModal, Modal } from '..'
import * as S from './style'

export type BabaFormProps = {
  isOpened: boolean
  baba: TBaba
  members: TMember[]
  handleClose(): void
  handleUpdate(baba: TBaba): void
}

export function BabaForm({
  isOpened,
  baba: b,
  members,
  handleClose,
  handleUpdate
}: BabaFormProps) {
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
  } = useBabaForm({ baba: b, isOpened })

  const { teams, date } = baba

  const disabledMembers: string[] = []
  teams.forEach(({ members }) => {
    members.forEach(({ id }) => id !== member[1] && disabledMembers.push(id))
  })
  return (
    <Modal title="Editar Baba" isOpened={isOpened} handleClose={handleClose}>
      <Box sx={S.Wrapper}>
        <InputDate date={date} handleChange={handleDateChange} />
        {teams.map(({ name, members: mbs, draws, wins }, teamIndex) => (
          <List key={teamIndex}>
            <ListSubheader sx={S.SubHeader}>
              <Typography>{name}</Typography>
              <Typography>Gols</Typography>
            </ListSubheader>
            {mbs.map(({ id, goals }, memberIndex) => {
              const member = getMemberById(members, id)
              return (
                <ListItem key={id} sx={S.Member} disablePadding>
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
