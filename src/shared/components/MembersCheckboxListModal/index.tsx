import { ChangeEvent } from 'react'
import { TFinance, TMember } from '@/shared/types'
import { separateMembers } from '@/shared/functions'
import { MembersCheckboxList, Modal } from '..'
import { Button } from '@mui/material'

type Props = {
  isOpened: boolean
  title: string
  members: TMember[]
  checkedMembers: string[]
  disabledMembers?: string[]
  finances: TFinance[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleClose(): void
}

export function MembersCheckboxListModal({
  isOpened,
  title,
  members,
  checkedMembers,
  disabledMembers,
  finances,
  handleChange,
  handleClose
}: Props) {
  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)
  return (
    <Modal isOpened={isOpened} title={title} handleClose={handleClose}>
      <div data-testid="members-checkbox-list-modal">
        <MembersCheckboxList
          title="Membros Fixos"
          checkedMembers={checkedMembers}
          disabledMembers={disabledMembers}
          finances={finances}
          handleChange={handleChange}
          members={fixedMembers}
        />
        <MembersCheckboxList
          title="Goleiros"
          checkedMembers={checkedMembers}
          disabledMembers={disabledMembers}
          finances={finances}
          handleChange={handleChange}
          members={goalkeepers}
        />
        <MembersCheckboxList
          title="Membros Avulsos"
          checkedMembers={checkedMembers}
          disabledMembers={disabledMembers}
          finances={finances}
          handleChange={handleChange}
          members={nonMembers}
        />
        <Button variant="contained" onClick={handleClose} fullWidth>
          Salvar
        </Button>
      </div>
    </Modal>
  )
}
