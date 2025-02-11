import { TFinance, TMember } from '@/types'

export const separateMembers = (members: TMember[]) => {
  const fixedMembers = members.filter(
    ({ isFixedMember, isGoalkeeper }) => isFixedMember && !isGoalkeeper
  )
  const goalkeepers = members.filter(
    ({ isFixedMember, isGoalkeeper }) => isFixedMember && isGoalkeeper
  )
  const nonMembers = members.filter(({ isFixedMember }) => !isFixedMember)
  return {
    fixedMembers,
    goalkeepers,
    nonMembers
  }
}

export const someFinanceIncludesMember = (
  finances: TFinance[],
  memberId: string
) => finances.some(({ memberId: mId }) => mId === memberId)
