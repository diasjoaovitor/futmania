import { TTeam } from '@/types'

export function sortTeamsByScore(teams: TTeam[]) {
  return teams.sort((a, b) => b.wins * 3 + b.draws - (a.wins * 3 + a.draws))
}
