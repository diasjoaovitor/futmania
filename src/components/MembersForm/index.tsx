import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch
} from '@mui/material'
import { TMember } from '@/types'
import { InputWithButton, Modal } from '..'
import * as GS from '@/styles'

export type MembersFormProps = {
  isOpened: boolean
  title: string
  member: TMember
  handleClose(): void
  handleOpenMemberStats(): void
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void
  handleDelete(): void
}

export function MembersForm({
  isOpened,
  title,
  member: { id, name, isFixedMember, isGoalkeeper },
  handleClose,
  handleOpenMemberStats,
  handleSubmit,
  handleDelete
}: MembersFormProps) {
  return (
    <Modal title={title} isOpened={isOpened} handleClose={handleClose}>
      <form onSubmit={handleSubmit} role="form">
        <InputWithButton
          inputProps={{
            name: 'name',
            label: 'Nome',
            defaultValue: name,
            required: true
          }}
          buttonProps={{
            children: 'Salvar',
            type: 'submit',
            variant: 'contained'
          }}
        />
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
          <Box sx={GS.FlexRow}>
            <Button
              variant="text"
              color="secondary"
              onClick={handleOpenMemberStats}
            >
              Ver Estatísticas
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button variant="text" color="error" onClick={handleDelete}>
              Excluir Membro
            </Button>
          </Box>
        )}
      </form>
    </Modal>
  )
}
