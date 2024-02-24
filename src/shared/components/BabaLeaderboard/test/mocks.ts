import { TBaba, TMember } from '@/shared/types'

export const mockedBaba: TBaba = {
  createdAt: '2024',
  date: '2024-01-25',
  teams: [
    {
      draws: 2,
      members: [
        {
          id: '1',
          goals: 2
        },
        {
          id: '2',
          goals: 0
        }
      ],
      name: 'Time 1',
      wins: 2
    },
    {
      draws: 2,
      members: [
        {
          id: '3',
          goals: 0
        },
        {
          id: '4',
          goals: 1
        }
      ],
      name: 'Time 2',
      wins: 1
    },
    {
      draws: 0,
      members: [
        {
          id: '5',
          goals: 2
        },
        {
          id: '6',
          goals: 1
        }
      ],
      name: 'Time 3',
      wins: 3
    }
  ],
  userId: 'abc',
  id: '2'
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
  },
  {
    ...member,
    name: 'Marcos',
    id: '5'
  },
  {
    ...member,
    name: 'Dudu',
    id: '6'
  }
]
