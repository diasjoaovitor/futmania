import { createContext, PropsWithChildren, useContext } from 'react'
import { User } from 'firebase/auth'
import { Alert, Loader } from '@/components'
import { TBabaUser } from '@/types'
import { useAuth } from './useAuth'

type TAuthContext = {
  user: User | null
  babaUser: TBabaUser
}

const AuthContext = createContext({} as TAuthContext)

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }: PropsWithChildren) {
  const { user, babaUser, isLoading, alertProps } = useAuth()
  return !isLoading ? (
    <AuthContext.Provider value={{ user, babaUser }}>
      {children}
      <Alert {...alertProps} />
    </AuthContext.Provider>
  ) : (
    <Loader open={isLoading} />
  )
}
