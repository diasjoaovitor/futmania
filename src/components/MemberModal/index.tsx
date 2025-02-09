import { Divider } from '@mui/material'
import { TMemberStats } from '@/utils'
import { TFinance, TMember } from '@/types'
import { MemberFrequency, MemberPayments, MemberStats, Modal } from '..'

export type TMemberModalProps = {
  isOpened: boolean
  member: TMember | undefined
  stats: TMemberStats | null
  finances: TFinance[]
  handleClose(): void
}

export const MemberModal = ({
  isOpened,
  member,
  stats,
  finances,
  handleClose
}: TMemberModalProps) => {
  if (!member || !stats) return null

  const { name } = member
  const { frequency } = stats

  return (
    <Modal title={name} isOpened={isOpened} handleClose={handleClose}>
      <>
        <MemberStats stats={stats} />
        <Divider sx={{ mb: 1 }} />
        <MemberFrequency frequency={frequency} />
        <Divider sx={{ mb: 1 }} />
        <MemberPayments
          memberId={member.id as string}
          frequency={frequency}
          finances={finances}
        />
      </>
    </Modal>
  )
}
