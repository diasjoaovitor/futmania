import { TMember, TTeam } from '@/types'

export const memberIsChecked = (member: TMember, checkedMembers: TMember[]) =>
  checkedMembers.includes(member)

export const memberHasBeenDrawn = (member: TMember, drawnMembers: TMember[]) =>
  drawnMembers.includes(member)

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
    const minLenght = Math.min(...lengths)
    const possibleTeamsIndex = tms
      .map(({ members }, index) =>
        members.length === minLenght ? index : null
      )
      .filter((i) => i !== null)
      .sort((a, b) => (a && b ? a - b : 1))
      .slice(0, members.length)
    const index =
      possibleTeamsIndex[
        Math.floor(Math.random() * (possibleTeamsIndex.length - 1))
      ]
    const member = mbs[mbs.length - 1]
    tms = tms.map((team, i) => {
      return index !== i
        ? team
        : {
            ...team,
            members: [
              ...team.members,
              {
                memberId: member,
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
  members: string[],
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
  return tms.map((team, index) => {
    if (index + 1 !== teamIndex) return team
    const result: TTeam = {
      ...team,
      members: [
        ...team.members,
        ...members.map((memberId) => ({
          memberId,
          goals: 0
        }))
      ]
    }
    return result
  })
}
