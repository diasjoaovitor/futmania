import { TFinanceModel, TMemberModel } from '@/models'

export const separateMembers = (members: TMemberModel[]) => {
  const fixedMembers: TMemberModel[] = []
  const goalkeepers: TMemberModel[] = []
  const nonMembers: TMemberModel[] = []
  members.forEach((member) => {
    if (!member.isFixedMember) {
      nonMembers.push(member)
    } else if (!member.isGoalkeeper) {
      fixedMembers.push(member)
    } else {
      goalkeepers.push(member)
    }
  })
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
