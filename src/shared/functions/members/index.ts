import { TFinance, TMember } from '@/shared/types'

export function separateMembers(members: TMember[]) {
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

export function someFinanceIncludesMember(
  finances: TFinance[],
  memberId: string
) {
  return finances.some(({ memberId: mId }) => mId === memberId)
}
