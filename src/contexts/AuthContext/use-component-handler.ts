import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { TAlertProps } from '@/components'
import { authConfig } from '@/config'
import { useAlert } from '@/hooks'
import { useQueryUser } from '@/react-query'
import { TBabaUser } from '@/types'

export type TUseAuthContext = {
  user: User | null
  babaUser: TBabaUser
  isLoading: boolean
  alertProps: TAlertProps
}

export const useComponentHandler = (): TUseAuthContext => {
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

  const alertProps: TAlertProps = {
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
