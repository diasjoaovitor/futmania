import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { authConfig } from '@/firebase'
import { TBabaUser } from '@/types'
import { useQueryUser } from '@/react-query'
import { useAlert } from '@/hooks'
import { AlertProps } from '@/components'

export type TUseAuthContext = {
  user: User | null
  babaUser: TBabaUser
  isLoading: boolean
  alertProps: AlertProps
}

export function useAuth(): TUseAuthContext {
  const [user, setUser] = useState<User | null>(null)
  const [babaUser, setBabaUser] = useState<TBabaUser>({
    name: 'Baba do Iecem',
    id: 'meDTqLk1i7NBqcnZSuMoL2R3RIt2'
  })
  const [isLoading, setIsLoading] = useState(true)

  const { data, isPending, isError } = useQueryUser(user?.uid)

  const { alert, alertIsOpened, setAlert, handleCloseAlert } = useAlert()

  useEffect(() => {
    authConfig.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoading(isPending)
    })
  }, [isPending])

  useEffect(() => {
    data?.id && setBabaUser(data)
  }, [data])

  useEffect(() => {
    if (!isError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível obter o usuário',
      description: 'Verifique sua conexão com a internet ou atualize a página'
    })
  }, [isError])

  const alertProps: AlertProps = {
    ...alert,
    isOpened: alertIsOpened,
    handleClose: handleCloseAlert
  }

  return {
    user,
    babaUser,
    isLoading,
    alertProps
  }
}
