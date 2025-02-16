export type TMember = {
  id?: string
  name: string
  isGoalkeeper: boolean
  isFixedMember: boolean
  userId: string
  createdAt: string
}

export type TTeam = {
  name: string
  members: {
    memberId: string
    goals: number
  }[]
  wins: number
  draws: number
}

export type TBaba = {
  id?: string
  date: string
  teams: TTeam[]
  userId: string
  createdAt: string
}
