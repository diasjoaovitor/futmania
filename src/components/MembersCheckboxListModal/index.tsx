import { Button } from '@mui/material'
import { ChangeEvent } from 'react'

import { TFinanceModel, TMemberModel } from '@/models'
import { separateMembers } from '@/utils'

import { MembersCheckboxList, Modal } from '..'

type TMembersCheckboxListModalProps = {
  isOpened: boolean
  title: string
  members: TMemberModel[]
  checkedMembers: string[]
  disabledMembers?: string[]
  finances: TFinanceModel[]
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
        {fixedMembers.length > 0 && (
          <MembersCheckboxList
            title="Membros Fixos"
            checkedMembers={checkedMembers}
            disabledMembers={disabledMembers}
            finances={finances}
            handleChange={handleChange}
            members={fixedMembers}
          />
        )}
        {goalkeepers.length > 0 && (
          <MembersCheckboxList
            title="Goleiros"
            checkedMembers={checkedMembers}
            disabledMembers={disabledMembers}
            finances={finances}
            handleChange={handleChange}
            members={goalkeepers}
          />
        )}
        {nonMembers.length > 0 && (
          <MembersCheckboxList
            title="Membros Avulsos"
            checkedMembers={checkedMembers}
            disabledMembers={disabledMembers}
            finances={finances}
            handleChange={handleChange}
            members={nonMembers}
          />
        )}
        <Button variant="contained" onClick={handleClose} fullWidth>
          Salvar
        </Button>
      </div>
    </Modal>
  )
}
