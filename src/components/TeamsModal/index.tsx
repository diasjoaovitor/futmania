import {
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@mui/material'
import { TMember, TTeam } from '@/types'
import { getMemberById } from '@/functions'
import { Modal } from '..'

type Props = {
  date: string
  members: TMember[]
  teams: TTeam[]
  isOpened: boolean
  handleClose(): void
  handleSubmit(teams: TTeam[], date: string): void
}

export function TeamsModal({
  date,
  members,
  teams,
  isOpened,
  handleClose,
  handleSubmit
}: Props) {
  return (
    <Modal title="Times" isOpened={isOpened} handleClose={handleClose}>
      <>
        {teams.map(({ name, members: mbs }, index) => (
          <List key={index}>
            <ListSubheader sx={{ position: 'static' }}>{name}</ListSubheader>
            {mbs.length > 0 ? (
              mbs.map(({ id }, index) => (
                <ListItem key={id}>
                  <ListItemText
                    primary={`${index + 1} - ${getMemberById(members, id)
                      ?.name}`}
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
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => handleSubmit(teams, date)}
          >
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
