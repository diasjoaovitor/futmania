import { TMember, TTeam } from '@/shared/types'

export function memberIsChecked(member: TMember, checkedMembers: TMember[]) {
  return checkedMembers.includes(member)
}

export function memberHasBeenDrawn(member: TMember, drawnMembers: TMember[]) {
  return drawnMembers.includes(member)
}

export function drawTeams(
  teams: TTeam[],
  members: string[],
  numberOfTeams: number
) {
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
    const index =
      possibleTeamsIndex[Math.floor(Math.random() * possibleTeamsIndex.length)]
    const member = mbs[mbs.length - 1]
    tms = tms.map((team, i) => {
      return index !== i
        ? team
        : {
            ...team,
            members: [
              ...team.members,
              {
                id: member,
                goals: 0
              }
            ]
          }
    })
    mbs.pop()
  }
  return tms
}

export function assignTeams(
  teams: TTeam[],
  members: string[],
  teamIndex: number
) {
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
    return {
      ...team,
      members: [
        ...team.members,
        ...members.map((id) => ({
          id,
          goals: 0
        }))
      ]
    }
  })
}
