import { Divider } from '@mui/material'

import { TFinanceModel, TMemberModel } from '@/models'
import { TMemberStats } from '@/utils'

import { Modal } from '..'
import { Frequency } from './Frequency'
import { Payments } from './Payments'
import { Stats } from './Stats'

export type TMemberStatsModalProps = {
  isOpened: boolean
  member: TMemberModel | null
  stats: TMemberStats | null
  finances: TFinanceModel[]
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
  return (
    <Modal
      dataTestId="member-stats-modal"
      title={member.name}
      isOpened={isOpened}
      handleClose={handleClose}
    >
      <>
        <Stats stats={stats} />
        <Divider sx={{ mb: 1 }} />
        <Frequency frequency={stats.frequency} />
        <Divider sx={{ mb: 1 }} />
        <Payments
          memberId={member.id as string}
          frequency={stats.frequency}
          finances={finances}
        />
      </>
    </Modal>
  )
}
