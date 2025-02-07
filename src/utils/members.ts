import { TFinanceModel, TMemberModel } from '@/models'

export const separateMembers = (members: TMemberModel[]) => {
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
  finances: TFinanceModel[],
  memberId: string
) => finances.some(({ memberId: mId }) => mId === memberId)
