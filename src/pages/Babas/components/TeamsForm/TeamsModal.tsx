import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@mui/material'

import { Modal } from '@/components'
import { TMemberModel, TTeam } from '@/models'
import { getMemberById } from '@/utils'

type TTeamsModalProps = {
  members: TMemberModel[]
  teams: TTeam[]
  isOpened: boolean
  handleClose(): void
  handleSubmit(): void
}

export const TeamsModal = ({
  members,
  teams,
  isOpened,
  handleClose,
  handleSubmit
}: TTeamsModalProps) => {
  return (
    <Modal title="Times" isOpened={isOpened} handleClose={handleClose}>
      <>
        {teams.map(({ name, members: mbs }, index) => (
          <List key={index}>
            <ListSubheader sx={{ position: 'static' }}>{name}</ListSubheader>
            {mbs.length > 0 ? (
              mbs.map(({ memberId }, index) => (
                <ListItem key={memberId}>
                  <ListItemText
                    primary={`${index + 1} - ${
                      getMemberById(members, memberId)?.name
                    }`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary={'Não há jogadores sorteados para esse time'}
                />
              </ListItem>
            )}
          </List>
        ))}
        <ButtonGroup sx={{ my: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Continuar sorteio
          </Button>
        </ButtonGroup>
      </>
    </Modal>
  )
}
