import { Divider } from '@mui/material'

import { TFinance, TMember } from '@/types'
import { TMemberStats } from '@/utils'

import { Modal } from '..'
import { Frequency } from './Frequency'
import { Payments } from './Payments'
import { Stats } from './Stats'

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
