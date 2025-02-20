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
import dayjs from 'dayjs'

import { DateInput, MembersCheckboxListModal, Modal } from '@/components'
import { useAppContext } from '@/contexts'
import { TBabaModel, TMemberModel } from '@/models'
import { getMemberById, handleFocus } from '@/utils'

import * as S from './styles'
import { useBabaForm } from './use-component-handler'

export type TBabaFormProps = {
  isOpened: boolean
  baba: TBabaModel
  members: TMemberModel[]
  handleClose(): void
}

export const BabaForm = ({
  isOpened,
  baba: b,
  members,
  handleClose
}: TBabaFormProps) => {
  const { babaMutationUpdateMutate } = useAppContext()
  const {
    baba,
    selectedMembers,
    modalIsOpened,
    handleDateChange,
    handleAddMemberClick,
    handleMemberClick,
    handleMemberChange,
    handleChange,
    handleMembersModalClose
  } = useBabaForm({ baba: b, isOpened })

  const { teams, date } = baba

  const disabledMembers: string[] = []
  teams.forEach(({ members }) => {
    members.forEach(
      ({ memberId }) =>
        memberId !== selectedMembers[1] && disabledMembers.push(memberId)
    )
  })
  return (
    <Modal title="Editar Baba" isOpened={isOpened} handleClose={handleClose}>
      <Box sx={S.Wrapper}>
        <DateInput
          label="Data"
          value={dayjs(date)}
          onChange={handleDateChange}
        />
        {teams.map(({ name, members: mbs, draws, wins }, teamIndex) => (
          <List key={teamIndex}>
            <ListSubheader sx={S.SubHeader}>
              <Typography>{name}</Typography>
              <Typography>Gols</Typography>
            </ListSubheader>
            {mbs.map(({ memberId, goals }, memberIndex) => {
              const member = getMemberById(members, memberId) as TMemberModel
              return (
                <ListItem key={memberId} sx={S.Member} disablePadding>
                  <ListItemButton
                    sx={{ py: 1 }}
                    onClick={() => handleMemberClick(member.id)}
                  >
                    <ListItemText primary={`${member?.name}`} />
                  </ListItemButton>
                  <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, teamIndex, memberIndex)
                    }
                    value={goals}
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
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
                slotProps={{ htmlInput: { min: 0 } }}
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
                slotProps={{ htmlInput: { min: 0 } }}
                onFocus={handleFocus}
              />
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </List>
        ))}
        <Button
          variant="contained"
          fullWidth
          onClick={() => babaMutationUpdateMutate(baba)}
        >
          Salvar
        </Button>
        <MembersCheckboxListModal
          isOpened={modalIsOpened}
          title="Selecionar Membro"
          members={members}
          checkedMembers={selectedMembers[1] ? [selectedMembers[1]] : []}
          disabledMembers={disabledMembers}
          finances={[]}
          handleChange={handleMemberChange}
          handleClose={handleMembersModalClose}
        />
      </Box>
    </Modal>
  )
}
