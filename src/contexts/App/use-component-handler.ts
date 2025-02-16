import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { TBabaModel, TFinanceModel, TMemberModel, TUserModel } from '@/models'
import { getLocalStorage } from '@/utils'

import { useAuthContext } from '..'
import { TAppContext } from './types'
import { useDataFetch } from './use-data-fetch'
import { useFinanceMutation } from './use-finance-mutation'
import { useUserMutation } from './use-user-mutation'

const appRoutes = ['/', '/finances', '/members', '/stats']

export const useComponentHandler = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { user } = useAuthContext()

  const [babaUser, setBabaUser] = useState<TUserModel | null>(
    getLocalStorage<TUserModel>('futmania_baba_user')
  )
  const [users, setUsers] = useState<TUserModel[]>([])
  const [babas, setBabas] = useState<TBabaModel[]>([])
  const [finances, setFinances] = useState<TFinanceModel[]>([])
  const [members, setMembers] = useState<TMemberModel[]>([])

  const userId = user?.uid

  const babaId = babaUser?.id || userId

  const { isFetching, usersData, babasData, financesData, membersData } =
    useDataFetch(babaId)

  const { userMutationIsPending, ...userMutationRest } =
    useUserMutation(setUsers)
  const { financeMutationIsPending, ...financeMutationRest } =
    useFinanceMutation(setFinances)

  useEffect(() => {
    if (!usersData) return
    setUsers(usersData)
    babasData && setBabas(babasData)
    financesData && setFinances(financesData)
    membersData && setMembers(membersData)
  }, [usersData, babasData, financesData, membersData])

  useEffect(() => {
    if (!users.length) return
    const babaUserIsValid = !!users.find((user) => user.id === babaUser?.id)
    if (babaUserIsValid) return
    const loggedUser = users.find((user) => user.id === userId)
    if (loggedUser) {
      setBabaUser(loggedUser)
    }
  }, [babaUser, users, userId, pathname, navigate])

  useEffect(() => {
    if (!usersData || !appRoutes.includes(pathname) || isFetching) return
    if (usersData.length === 0) {
      navigate('/signin')
      return
    }
    if (!babaUser) {
      navigate('/explorer')
    }
  }, [usersData, babaUser, isFetching, pathname, navigate])

  const isLoading =
    isFetching || userMutationIsPending || financeMutationIsPending

  const isAuthenticatedInTheSelectedBaba = !!userId && userId === babaUser?.id

  const result: TAppContext = {
    isLoading,
    isAuthenticatedInTheSelectedBaba,
    userId,
    babaUser,
    setBabaUser,
    users,
    babas,
    finances,
    members,
    ...userMutationRest,
    ...financeMutationRest
  }

  return result
}
