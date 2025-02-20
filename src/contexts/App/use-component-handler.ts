import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { TBabaModel, TFinanceModel, TMemberModel, TUserModel } from '@/models'
import { getLocalStorage } from '@/utils'

import { useAuthContext } from '..'
import { TAppContext } from './types'
import { useBabaMutation } from './use-baba-mutation'
import { useDataFetch } from './use-data-fetch'
import { useFinanceMutation } from './use-finance-mutation'
import { useMemberMutation } from './use-member-mutation'
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

  const { isFetching, usersData, babasData, financesData, membersData } =
    useDataFetch(babaUser?.id)

  const { userMutationIsPending, ...userMutationRest } =
    useUserMutation(setUsers)
  const { babaMutationIsPending, ...babaMutationRest } =
    useBabaMutation(setBabas)
  const { financeMutationIsPending, ...financeMutationRest } =
    useFinanceMutation(setFinances)
  const { memberMutationIsPending, ...memberMutationRest } =
    useMemberMutation(setMembers)

  useEffect(() => {
    if (!usersData || !babasData || !financesData || !membersData) return
    setUsers(usersData)
    setBabas(babasData)
    setFinances(financesData)
    setMembers(membersData)
  }, [usersData, babasData, financesData, membersData])

  useEffect(() => {
    if (!usersData) return
    const babaUserIsValid = !!usersData.find((user) => user.id === babaUser?.id)
    if (babaUserIsValid) return
    const loggedUser = usersData.find((user) => user.id === userId)
    if (loggedUser) {
      setBabaUser(loggedUser)
    }
  }, [usersData, babaUser, userId, pathname, navigate])

  useEffect(() => {
    if (!usersData || !appRoutes.includes(pathname) || userId || isFetching)
      return
    if (usersData.length === 0) {
      navigate('/signin')
      return
    }
    navigate('/explorer')
  }, [usersData, babaUser, userId, isFetching, pathname, navigate])

  const isLoading =
    isFetching ||
    userMutationIsPending ||
    babaMutationIsPending ||
    financeMutationIsPending ||
    memberMutationIsPending

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
    ...babaMutationRest,
    ...financeMutationRest,
    ...memberMutationRest
  }

  return result
}
