import { User } from 'firebase/auth'
import { createContext, PropsWithChildren, useContext } from 'react'

import { Alert, Loader } from '@/components'
import { TBabaUser } from '@/types'

import { useComponentHandler } from './use-component-handler'

type TAuthContext = {
  user: User | null
  babaUser: TBabaUser
}

const AuthContext = createContext({} as TAuthContext)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user, babaUser, isLoading, alertProps } = useComponentHandler()
  return !isLoading ? (
    <AuthContext.Provider value={{ user, babaUser }}>
      {children}
      <Alert {...alertProps} />
    </AuthContext.Provider>
  ) : (
    <Loader open={isLoading} />
  )
}
