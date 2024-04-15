import { TBaba, TTeam } from '@/shared/types'

export const mockedTeams: TTeam[] = [
  {
    name: 'Team 1',
    draws: 2,
    wins: 2,
    members: [
      {
        id: '1', // João
        goals: 2
      },
      {
        id: '2', // Vitor
        goals: 0
      }
    ]
  },
  {
    name: 'Team 2',
    draws: 2,
    wins: 1,
    members: [
      {
        id: '3', // Pedro
        goals: 0
      },
      {
        id: '4', // Abel
        goals: 1
      }
    ]
  },
  {
    name: 'Team 3',
    draws: 0,
    wins: 3,
    members: [
      {
        id: '5', // Endrick
        goals: 2
      },
      {
        id: '6', // Dudu
        goals: 1
      }
    ]
  }
]

export const mockedBaba: TBaba = {
  createdAt: '2023',
  date: '2023-11-04',
  teams: mockedTeams,
  userId: 'abc',
  id: '1'
}

export const mockedBabas: TBaba[] = [
  mockedBaba,
  {
    createdAt: '2024',
    date: '2024-01-25',
    teams: mockedTeams,
    userId: 'abc',
    id: '2'
  },
  {
    createdAt: '2024',
    date: '2024-04-04',
    teams: mockedTeams,
    userId: 'abc',
    id: '3'
  }
]
