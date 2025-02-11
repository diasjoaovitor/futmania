import { TBaba, TMember } from '@/types'

import { sortByDate } from './sort'

export type TFrequency = {
  date: string
  showedUp: boolean
}

export type TMemberStats = {
  id: string
  scoreRanking: number
  numberOfBabas: number
  numberOfMostScore: number
  score: number
  goals: number
  goalsAverage: number
  frequency: TFrequency[]
}

export type TStats = TMemberStats & TMember

export const getMemberStats = (babas: TBaba[], id: string): TMemberStats => {
  const frequency: TFrequency[] = []
  const bs = (sortByDate(babas) as TBaba[]).filter(({ date, teams }) => {
    const team = teams.find(({ members }) =>
      members.find(({ memberId }) => memberId === id)
    )
    team
      ? frequency.push({ date, showedUp: true })
      : frequency.length > 0 && frequency.push({ date, showedUp: false })
    return team
  })
  let goals = 0
  let score = 0
  const mostScore = bs.filter(({ teams }) => {
    const orderedByRanking = teams.sort((a, b) => {
      const aScore = a.wins * 3 + a.draws
      const bScore = b.wins * 3 + b.draws
      return bScore - aScore
    })
    teams.forEach(({ members, draws, wins }) => {
      const _score = wins * 3 + draws
      members.forEach(({ memberId, goals: _goals }) => {
        if (id === memberId) {
          goals += _goals
          score += _score
        }
      })
    })
    const hasMember = orderedByRanking[0].members.find(
      ({ memberId }) => memberId === id
    )
    return hasMember
  })
  return {
    id,
    numberOfBabas: bs.length,
    numberOfMostScore: mostScore.length,
    score,
    goals,
    goalsAverage: goals / bs.length || 0,
    scoreRanking: score + goals,
    frequency
  }
}

export const getMembersStats = (
  babas: TBaba[],
  members: TMember[]
): TStats[] => {
  const stats = members
    .map((member) => {
      const stats = getMemberStats(babas, member.id as string)
      return { ...member, ...stats }
    })
    .filter(({ numberOfBabas }) => numberOfBabas > 0)
  return stats
}
