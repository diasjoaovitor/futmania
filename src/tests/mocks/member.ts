import { TMemberModel } from '@/models'

export const mockedMember: TMemberModel = {
  createdAt: '2023',
  id: '1',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: '1',
  updatedAt: '2023'
}

export const mockedMembers: TMemberModel[] = [
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
  },
  {
    ...mockedMember,
    name: 'Zidane',
    id: '8'
  }
]
