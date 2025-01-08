import { TMember } from '@/types'

export const mockedMember: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'abc',
  id: '1'
}

export const mockedMembers: TMember[] = [
  mockedMember,
  {
    ...mockedMember,
    name: 'Vitor',
    isGoalkeeper: true,
    id: '2'
  },
  {
    ...mockedMember,
    name: 'Pedro',
    isFixedMember: false,
    id: '3'
  },
  {
    ...mockedMember,
    name: 'Abel',
    id: '4'
  },
  {
    ...mockedMember,
    name: 'Endrick',
    id: '5'
  },
  {
    ...mockedMember,
    name: 'Dudu',
    isFixedMember: false,
    id: '6'
  },
  {
    ...mockedMember,
    name: 'Weverton',
    isGoalkeeper: true,
    id: '7'
  }
]
