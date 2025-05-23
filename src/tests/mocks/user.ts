import { TUserModel } from '@/models'

export const mockedUser: TUserModel = {
  createdAt: '2025',
  id: '1',
  displayName: 'Baba Test',
  updatedAt: '2025'
}

export const mockedUsers: TUserModel[] = [
  mockedUser,
  {
    ...mockedUser,
    id: '2',
    displayName: 'Other Baba'
  }
]
