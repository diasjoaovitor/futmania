import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField
} from '@mui/material'
import { TMember } from '@/shared/types'
import { Modal } from '..'
import * as GS from '@/shared/styles'

export type MembersFormProps = {
  isOpened: boolean
  title: string
  member: TMember
  handleClose(): void
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void
  handleDelete(): void
}

export function MembersForm({
  isOpened,
  title,
  member: { id, name, isFixedMember, isGoalkeeper },
  handleClose,
  handleSubmit,
  handleDelete
}: MembersFormProps) {
  return (
    <Modal title={title} isOpened={isOpened} handleClose={handleClose}>
      <form onSubmit={handleSubmit} role="form">
        <FormControl sx={GS.ButtonGrid}>
          <TextField name="name" label="Nome" defaultValue={name} required />
          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </FormControl>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch defaultChecked={isFixedMember} name="isFixedMember" />
            }
            label="Fixo"
          />
          <FormControlLabel
            control={
              <Switch defaultChecked={isGoalkeeper} name="isGoalkeeper" />
            }
            label="Goleiro"
          />
        </FormGroup>
        {id && (
          <Button variant="text" color="error" onClick={handleDelete}>
            Excluir Membro
          </Button>
        )}
      </form>
    </Modal>
  )
}
