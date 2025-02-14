import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { TUserModel } from '@/models'
import { getLocalStorage } from '@/utils'

import { useAuthContext } from '..'
import { TAppContext } from './types'
import { useDataFetch } from './use-data-fetch'
import { useUserMutation } from './use-user-mutation'

const appRoutes = ['/', '/finances', '/members', '/stats']

export const useComponentHandler = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user } = useAuthContext()
  const userId = user?.uid

  const [babaUser, setBabaUser] = useState<TUserModel | null>(null)
  const [users, setUsers] = useState<TUserModel[]>([])

  const { isFetching, usersData } = useDataFetch()

  const { userMutationIsPending, ...userMutationRest } =
    useUserMutation(setUsers)

  useEffect(() => {
    if (!usersData) return
    setUsers(usersData)
  }, [usersData])

  useEffect(() => {
    const babaUser =
      users.find((user) => user.id === userId) ||
      getLocalStorage<TUserModel>('futmania_baba_user')
    if (babaUser) {
      setBabaUser(babaUser)
      return
    }
    if (users.length && appRoutes.includes(pathname)) {
      navigate('/explorer')
    }
  }, [users, userId, pathname, navigate])

  const isLoading = isFetching || userMutationIsPending

  const isAuthenticatedInTheSelectedBaba = !!userId && userId === babaUser?.id

  const result: TAppContext & { isLoading: boolean } = {
    isLoading,
    isAuthenticatedInTheSelectedBaba,
    userId,
    babaUser,
    setBabaUser,
    users,
    ...userMutationRest
  }

  return result
}
