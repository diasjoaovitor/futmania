export type TTeamMember = {
  memberId: string
  goals: number
}

export type TTeam = {
  name: string
  members: TTeamMember[]
  wins: number
  draws: number
}

export type TBabaModel = {
  id: string
  userId: string
  date: string
  teams: TTeam[]
  createdAt: string
  updatedAt: string
}
