import { ChangeEvent } from 'react'
import { TFinance, TMember } from '@/shared/types'
import { separateMembers } from '@/shared/functions'
import { MembersCheckboxList, Modal } from '..'

type Props = {
  isOpened: boolean
  title: string
  members: TMember[]
  checkedMembers: string[]
  finances: TFinance[]
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  handleClose(): void
}

export function MembersCheckboxListModal({
  isOpened,
  title,
  members,
  checkedMembers,
  finances,
  handleChange,
  handleClose
}: Props) {
  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)
  return (
    <Modal isOpened={isOpened} title={title} handleClose={handleClose}>
      <>
        <MembersCheckboxList
          title="Membros Fixos"
          checkedMembers={checkedMembers}
          finances={finances}
          handleChange={handleChange}
          members={fixedMembers}
        />
        <MembersCheckboxList
          title="Goleiros"
          checkedMembers={checkedMembers}
          finances={finances}
          handleChange={handleChange}
          members={goalkeepers}
        />
        <MembersCheckboxList
          title="Membros Avulsos"
          checkedMembers={checkedMembers}
          finances={finances}
          handleChange={handleChange}
          members={nonMembers}
        />
      </>
    </Modal>
  )
}
