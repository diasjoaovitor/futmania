import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch
} from '@mui/material'

import { InputWithButton, Modal } from '@/components'
import { TMemberModel } from '@/models'
import * as GS from '@/styles'

import { useComponentHandler } from './use-component-handler'

export type TFormProps = {
  isOpened: boolean
  title: string
  member: TMemberModel | null
  handleClose(): void
  handleOpenMemberStats(): void
}

export const Form = ({
  isOpened,
  title,
  member,
  handleClose,
  handleOpenMemberStats
}: TFormProps) => {
  const { defaultValues, form, handleDialogOpen, handleSubmit } =
    useComponentHandler({ member, isOpened, handleClose })

  return (
    <Modal title={title} isOpened={isOpened} handleClose={handleClose}>
      <form role="form" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <InputWithButton
          inputProps={{
            label: 'Nome',
            ...form.register('name'),
            error: !!form.formState.errors.name,
            helperText: form.formState.errors.name?.message
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
              <Switch
                {...form.register('isFixedMember')}
                defaultChecked={defaultValues.isFixedMember}
              />
            }
            label="Fixo"
          />
          <FormControlLabel
            control={
              <Switch
                {...form.register('isGoalkeeper')}
                defaultChecked={defaultValues.isGoalkeeper}
              />
            }
            label="Goleiro"
          />
        </FormGroup>
        {member && (
          <Box sx={GS.FlexRow}>
            <Button
              variant="text"
              color="secondary"
              onClick={handleOpenMemberStats}
            >
              Ver Estatísticas
            </Button>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button variant="text" color="error" onClick={handleDialogOpen}>
              Excluir Membro
            </Button>
          </Box>
        )}
      </form>
    </Modal>
  )
}
