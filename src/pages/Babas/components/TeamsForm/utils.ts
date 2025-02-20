import { TMemberModel, TTeam } from '@/models'

export const memberIsChecked = (
  member: TMemberModel,
  checkedMembers: TMemberModel[]
) => {
  return checkedMembers.includes(member)
}

export const memberHasBeenDrawn = (
  member: TMemberModel,
  drawnMembers: TMemberModel[]
) => {
  return drawnMembers.includes(member)
}

export const drawTeams = (
  teams: TTeam[],
  members: string[],
  numberOfTeams: number
) => {
  let tms: TTeam[] = new Array(numberOfTeams)
    .fill({ members: [], name: '', draws: 0, wins: 0 } as TTeam)
    .map((team, index) =>
      teams[index]
        ? { ...teams[index] }
        : { ...team, name: `Time ${index + 1}` }
    )
  const mbs = [...members]
  while (mbs.length > 0) {
    const lengths = tms.map(({ members }) => members.length)
    const minLength = Math.min(...lengths)
    const possibleTeamsIndex = tms
      .map(({ members }, index) =>
        members.length === minLength ? index : null
      )
      .filter((i) => i !== null)
      .sort((a, b) => (a && b ? a - b : 1))
      .slice(0, members.length)
    const index =
      possibleTeamsIndex[
        Math.floor(Math.random() * (possibleTeamsIndex.length - 1))
      ]
    const memberId = mbs[mbs.length - 1]
    tms = tms.map((team, i) => {
      return index !== i
        ? team
        : {
            ...team,
            members: [
              ...team.members,
              {
                memberId,
                goals: 0
              }
            ]
          }
    })
    mbs.pop()
  }
  return tms
}

export const assignTeams = (
  teams: TTeam[],
  memberIds: string[],
  teamIndex: number
) => {
  const tms: TTeam[] = new Array(
    teams.length <= teamIndex ? teamIndex : teams.length
  )
    .fill({ members: [], name: '', draws: 0, wins: 0 } as TTeam)
    .map((team, index) =>
      teams[index]
        ? { ...teams[index] }
        : { ...team, name: `Time ${index + 1}` }
    )
  const result: TTeam[] = tms.map((team, index) => {
    if (index + 1 !== teamIndex) return team
    return {
      ...team,
      members: [
        ...team.members,
        ...memberIds.map((memberId) => ({
          memberId,
          goals: 0
        }))
      ]
    }
  })
  return result
}
