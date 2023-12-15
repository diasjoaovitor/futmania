import { TBaba, TMember } from '@/shared/types'

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

export function someBabaIncludesMember(id: string, babas: TBaba[]) {
  return babas.some(({ teams }) =>
    teams.some(({ members }) => members.some(({ id: _id }) => _id === id))
  )
}

export function sortMembers(members: TMember[]) {
  return members.sort((a, b) => a.name.localeCompare(b.name))
}
