import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import dayjs from 'dayjs'
import { Controller } from 'react-hook-form'

import { DateInput, MembersCheckboxListModal, Modal } from '@/components'
import { TFinanceModel } from '@/models'
import { sortMembersByName } from '@/utils'

import { useComponentHandler } from './use-component-handler'
import { formatCurrencyMask, formatCurrencyToNumber } from './utils'

export type TFormProps = {
  isOpened: boolean
  title: string
  finance: TFinanceModel | null
  handleClose(): void
}

export const Form = ({ isOpened, title, finance, handleClose }: TFormProps) => {
  const {
    members,
    finances,
    color,
    form,
    checkedMembers,
    isCheckListModalOpen,
    setIsCheckListModalOpen,
    handleTypeChange,
    handleCheckedMembersChange,
    handleDialogOpen,
    handleSubmit
  } = useComponentHandler({ finance, isOpened, handleClose })

  return (
    <Modal
      title={title}
      color={color.variant}
      isOpened={isOpened}
      handleClose={handleClose}
    >
      <FormControl
        component="form"
        role="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        fullWidth
      >
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              sx={{ mb: 1 }}
              onChange={(e) => handleTypeChange(e, field)}
            >
              <FormControlLabel
                value="-"
                control={<Radio color="error" />}
                label="Despesa"
                disabled={!!finance?.id}
              />
              <FormControlLabel value="+" control={<Radio />} label="Receita" />
            </RadioGroup>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              color={color.variant}
              label="Descrição"
              disabled={!!finance?.id}
              onClick={() =>
                checkedMembers.length > 0 && setIsCheckListModalOpen(true)
              }
              error={!!form.formState.errors.description}
              helperText={form.formState.errors.description?.message}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Controller
          name="value"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valor"
              color={color.variant}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  )
                }
              }}
              error={!!form.formState.errors.value}
              helperText={form.formState.errors.value?.message}
              onChange={(e) => {
                form.setValue(
                  'value',
                  formatCurrencyMask(formatCurrencyToNumber(e.target.value))
                )
              }}
              sx={{ mb: 2 }}
            />
          )}
        />
        <DateInput
          label="Data"
          color={color.variant}
          {...form.register('date')}
          defaultValue={dayjs(form.getValues('date'))}
          onChange={undefined}
        />
        {form.getValues('type') === '+' && !finance?.id && (
          <>
            <Button
              variant="text"
              size="small"
              sx={{ width: 182, mt: 2 }}
              onClick={() => setIsCheckListModalOpen(true)}
            >
              Atribuir pagamentos
            </Button>
            <MembersCheckboxListModal
              title="Atribuir Pagamentos"
              members={sortMembersByName(members)}
              checkedMembers={checkedMembers}
              finances={finances}
              isOpened={isCheckListModalOpen}
              handleClose={() => setIsCheckListModalOpen(false)}
              handleChange={handleCheckedMembersChange}
            />
          </>
        )}
        <Button
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
          color={color.variant}
        >
          Salvar
        </Button>
        {finance?.id && (
          <>
            <Divider sx={{ mt: 2 }} />
            <Button variant="text" color="error" onClick={handleDialogOpen}>
              Excluir
            </Button>
          </>
        )}
      </FormControl>
    </Modal>
  )
}
