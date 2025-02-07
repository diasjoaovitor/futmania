import { User } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Loader } from '@/components'
import { authConfig } from '@/config'

type TAuthContext = {
  user: User | null
}

const AuthContext = createContext({} as TAuthContext)

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    authConfig.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoading(false)
      if (user?.emailVerified === false && user.email !== 'teste@teste.com') {
        navigate('/email-verification')
      }
    })
  }, [pathname, navigate])

  return !isLoading ? (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  ) : (
    <Loader open={isLoading} />
  )
}
