import { TMember, TTeam } from '@/shared/types'

export const mockedTeam: TTeam = {
  draws: 2,
  members: [
    {
      id: '1',
      goals: 2
    },
    {
      id: '2',
      goals: 0
    },
    {
      id: '3',
      goals: 0
    },
    {
      id: '4',
      goals: 1
    }
  ],
  name: 'Time 1',
  wins: 2
}

export const member: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'a',
  id: '1'
}

export const mockedMembers: TMember[] = [
  member,
  {
    ...member,
    name: 'Vitor',
    isGoalkeeper: true,
    id: '2'
  },
  {
    ...member,
    name: 'Pedro',
    isFixedMember: false,
    id: '3'
  },
  {
    ...member,
    name: 'Abel',
    id: '4'
  }
]
