import { Divider } from '@mui/material'
import { TMemberStats } from '@/utils'
import { TFinance, TMember } from '@/types'
import { Modal } from '..'
import { Stats } from './Stats'
import { Frequency } from './Frequency'
import { Payments } from './Payments'

export type TMemberStatsModalProps = {
  isOpened: boolean
  member: TMember | undefined
  stats: TMemberStats | null
  finances: TFinance[]
  handleClose(): void
}

export const MemberStatsModal = ({
  isOpened,
  member,
  stats,
  finances,
  handleClose
}: TMemberStatsModalProps) => {
  if (!member || !stats) return null

  const { name } = member
  const { frequency } = stats

  return (
    <Modal title={name} isOpened={isOpened} handleClose={handleClose}>
      <>
        <Stats stats={stats} />
        <Divider sx={{ mb: 1 }} />
        <Frequency frequency={frequency} />
        <Divider sx={{ mb: 1 }} />
        <Payments
          memberId={member.id as string}
          frequency={frequency}
          finances={finances}
        />
      </>
    </Modal>
  )
}
