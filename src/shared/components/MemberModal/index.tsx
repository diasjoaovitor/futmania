import { Divider } from '@mui/material'
import { TMemberStats } from '@/shared/functions'
import { TFinance, TMember } from '@/shared/types'
import { MemberFrequency, MemberPayments, MemberStats, Modal } from '..'

export type MemberModalProps = {
  isOpened: boolean
  member: TMember | undefined
  stats: TMemberStats | null
  finances: TFinance[]
  handleClose(): void
}

export function MemberModal({
  isOpened,
  member,
  stats,
  finances,
  handleClose
}: MemberModalProps) {
  if (!member || !stats) return <></>

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
