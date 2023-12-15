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
    id: string
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

export type TBabaUser = {
  id: string
  name: string
}

export type TFinance = {
  id?: string
  memberId?: string
  date: string
  description: string
  type: '+' | '-'
  userId: string
  createdAt: string
}
