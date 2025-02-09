import { TTeam } from '@/types'

export const sortTeamsByScore = (teams: TTeam[]) =>
  teams.sort((a, b) => b.wins * 3 + b.draws - (a.wins * 3 + a.draws))
