import { createContext, ReactNode, useContext } from 'react'

import { Loader } from '@/components'
import { TBabaModel, TFinanceModel, TMemberModel, TUserModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'

import { useComponentHandler } from './use-component-handler'

type TAppContext = {
  isAuthenticatedInTheSelectedBaba: boolean
  userId: string | undefined
  babaUser: TUserModel | null
  setBabaUser(user: TUserModel | null): void

  babas: TBabaModel[]
  babaMutationCreateMutate(data: TParamsCreate<TBabaModel>): void
  babaMutationUpdateMutate(data: TParamsUpdate<TBabaModel>): void
  babaMutationDeleteMutate(id: string): void

  finances: TFinanceModel[]
  financeMutationCreateMutate(data: TParamsCreate<TFinanceModel>): void
  financeMutationCreateManyMutate(data: TParamsCreate<TFinanceModel>[]): void
  financeMutationUpdateMutate(data: TParamsUpdate<TFinanceModel>): void
  financeMutationDeleteMutate(id: string): void

  members: TMemberModel[]
  memberMutationCreateMutate(data: TParamsCreate<TMemberModel>): void
  memberMutationUpdateMutate(data: TParamsUpdate<TMemberModel>): void
  memberMutationDeleteMutate(id: string): void

  users: TUserModel[]
  userMutationUpdateMutate(data: TParamsUpdate<TUserModel>): void
}

const AppContext = createContext({} as TAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, ...rest } = useComponentHandler()
  return (
    <AppContext.Provider value={rest}>
      {children}
      <Loader open={isLoading} />
    </AppContext.Provider>
  )
}
