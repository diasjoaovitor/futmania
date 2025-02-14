import { TUserModel } from '@/models'
import { TParamsUpdate } from '@/types'

export type TAppContext = {
  isAuthenticatedInTheSelectedBaba: boolean
  userId: string | undefined
  babaUser: TUserModel | null
  setBabaUser(user: TUserModel | null): void

  users: TUserModel[]
  userMutationUpdateMutate(data: TParamsUpdate<TUserModel>): void
}
