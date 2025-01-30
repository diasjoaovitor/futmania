import { TBabaModel, TTeam } from '@/models'

export const mockedTeams: TTeam[] = [
  {
    name: 'Team 1',
    draws: 2,
    wins: 2,
    members: [
      {
        memberId: '1', // João
        goals: 2
      },
      {
        memberId: '2', // Vitor
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
        memberId: '3', // Pedro
        goals: 0
      },
      {
        memberId: '4', // Abel
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
        memberId: '5', // Endrick
        goals: 2
      },
      {
        memberId: '6', // Dudu
        goals: 1
      }
    ]
  }
]

export const mockedBaba: TBabaModel = {
  updatedAt: '2023',
  createdAt: '2023',
  date: '2023-11-04',
  teams: mockedTeams,
  userId: '1',
  id: '1'
}

export const mockedBabas: TBabaModel[] = [
  mockedBaba,
  {
    ...mockedBaba,
    date: '2024-01-25',
    id: '2'
  },
  {
    ...mockedBaba,
    date: '2024-04-04',
    id: '3'
  }
]
