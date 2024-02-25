import { TFrequency, TStats } from '@/shared/functions'
import { TMember } from '@/shared/types'

const mockedFrequency: TFrequency[] = [
  {
    date: '2024-02-14',
    showedUp: false
  },
  {
    date: '2024-02-04',
    showedUp: true
  },
  {
    date: '2024-01-21',
    showedUp: false
  },
  {
    date: '2024-01-14',
    showedUp: true
  }
]

const mockedMember: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'abc'
}

const mockedMemberStats: TStats = {
  ...mockedMember,
  frequency: [],
  goals: 0,
  goalsAverage: 0,
  numberOfBabas: 0,
  numberOfMostScore: 0,
  score: 0,
  scoreRanking: 0,
  id: '1'
}

export const mockedStats: TStats[] = [
  mockedMemberStats,
  {
    ...mockedMemberStats,
    id: '2',
    name: 'Vitor',
    frequency: mockedFrequency,
    numberOfBabas: 2,
    goals: 2,
    goalsAverage: 1,
    numberOfMostScore: 1,
    score: 6,
    scoreRanking: 8
  },
  {
    ...mockedMemberStats,
    id: '3',
    name: 'Dias',
    frequency: mockedFrequency,
    numberOfBabas: 2,
    goals: 3,
    goalsAverage: 1.5,
    numberOfMostScore: 1,
    score: 6,
    scoreRanking: 9
  }
]
