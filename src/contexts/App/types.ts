import { TBabaModel, TFinanceModel, TMemberModel, TUserModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'

export type TAppContext = {
  isLoading: boolean

  isAuthenticatedInTheSelectedBaba: boolean
  userId: string | undefined
  babaUser: TUserModel | null
  setBabaUser(user: TUserModel | null): void

  users: TUserModel[]
  userMutationUpdateMutate(data: TParamsUpdate<TUserModel>): void

  babas: TBabaModel[]

  finances: TFinanceModel[]
  financeMutationCreateMutate(data: TParamsCreate<TFinanceModel>): void
  financeMutationCreateManyMutate(data: TParamsCreate<TFinanceModel>[]): void
  financeMutationUpdateMutate(data: TParamsUpdate<TFinanceModel>): void
  financeMutationDeleteMutate(id: string): void

  members: TMemberModel[]
  memberMutationCreateMutate(data: TParamsCreate<TMemberModel>): void
  memberMutationUpdateMutate(data: TParamsUpdate<TMemberModel>): void
  memberMutationDeleteMutate(id: string): void
}
