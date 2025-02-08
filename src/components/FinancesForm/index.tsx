import { ChangeEvent } from 'react'
import { Dayjs } from 'dayjs'
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { TFinance, TMember } from '@/types'
import { useModal } from '@/hooks'
import { sortMembersByName } from '@/utils'
import { palette } from '@/themes'
import { InputAdornment, InputDate, MembersCheckboxListModal, Modal } from '..'
import * as S from './style'

type TColor = {
  mui: 'error' | 'primary'
  hex: string
}

export type FinancesFormProps = {
  isOpened: boolean
  title: string
  finance: TFinance
  finances: TFinance[]
  members: TMember[]
  checkedMembers: string[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleDateChange(e: Dayjs | null): void
  handleCheckedMembersChange(e: ChangeEvent<HTMLInputElement>): void
  handleClose(): void
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void
  handleDelete(): void
}

export function FinancesForm({
  isOpened,
  title,
  finance: { date, description, type, value, id, memberId },
  finances,
  members,
  checkedMembers,
  handleChange,
  handleDateChange,
  handleCheckedMembersChange,
  handleClose,
  handleSubmit,
  handleDelete
}: FinancesFormProps) {
  const { modalIsOpened, handleOpenModal, handleCloseModal } = useModal()

  const color: TColor =
    type === '-'
      ? {
          mui: 'error',
          hex: palette.red
        }
      : {
          mui: 'primary',
          hex: palette.blue
        }

  return (
    <Modal
      title={title}
      isOpened={isOpened}
      handleClose={handleClose}
      color={color.hex}
    >
      <form onSubmit={handleSubmit} role="form" autoComplete="off">
        <FormControl fullWidth sx={S.Wrapper}>
          <RadioGroup
            name="type"
            value={type}
            onChange={handleChange}
            sx={{ mb: 2 }}
            row
          >
            <FormControlLabel
              value="-"
              control={<Radio color="error" />}
              label="Despesa"
              disabled={Boolean(memberId)}
            />
            <FormControlLabel value="+" control={<Radio />} label="Receita" />
          </RadioGroup>
          <TextField
            color={color.mui}
            name="description"
            label="Descrição"
            value={description}
            required
            onChange={handleChange}
            disabled={Boolean(memberId)}
            onClick={() => checkedMembers.length > 0 && handleOpenModal()}
          />
          <InputAdornment
            value={value}
            label="Valor"
            name="value"
            color={color.mui}
            handleChange={handleChange}
          />
          <InputDate
            date={date}
            color={color.mui}
            handleChange={handleDateChange}
          />
          {type === '+' && !id && (
            <>
              <Button
                variant="text"
                size="small"
                sx={{ width: 182, mb: 2 }}
                onClick={handleOpenModal}
              >
                Referenciar Membros
              </Button>
              <MembersCheckboxListModal
                title="Referenciar Membros"
                members={sortMembersByName(members)}
                checkedMembers={checkedMembers}
                finances={finances}
                isOpened={modalIsOpened}
                handleClose={handleCloseModal}
                handleChange={handleCheckedMembersChange}
              />
            </>
          )}
          <Button type="submit" variant="contained" color={color.mui}>
            Salvar
          </Button>
        </FormControl>
        {id && (
          <>
            <Divider sx={{ mt: 2 }} />
            <Button variant="text" color="error" onClick={handleDelete}>
              Excluir
            </Button>
          </>
        )}
      </form>
    </Modal>
  )
}
