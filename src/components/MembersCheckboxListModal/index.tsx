import { ChangeEvent } from 'react'
import { TFinance, TMember } from '@/types'
import { separateMembers } from '@/utils'
import { MembersCheckboxList, Modal } from '..'
import { Button } from '@mui/material'

type TMembersCheckboxListModalProps = {
  isOpened: boolean
  title: string
  members: TMember[]
  checkedMembers: string[]
  disabledMembers?: string[]
  finances: TFinance[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleClose(): void
}

export const MembersCheckboxListModal = ({
  isOpened,
  title,
  members,
  checkedMembers,
  disabledMembers,
  finances,
  handleChange,
  handleClose
}: TMembersCheckboxListModalProps) => {
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
