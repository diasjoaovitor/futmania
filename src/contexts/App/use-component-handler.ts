import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { TBabaModel, TFinanceModel, TMemberModel, TUserModel } from '@/models'

import { useAuthContext } from '..'
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
  const userId = user?.uid

  const [babaUser, setBabaUser] = useState<TUserModel | null>(null)
  const [users, setUsers] = useState<TUserModel[]>([])
  const [babas, setBabas] = useState<TBabaModel[]>([])
  const [finances, setFinances] = useState<TFinanceModel[]>([])
  const [members, setMembers] = useState<TMemberModel[]>([])

  const babaId = babaUser?.id || userId

  const { isFetching, usersData, babasData, financesData, membersData } =
    useDataFetch(babaId)

  const { babaMutationIsPending, ...babaMutationRest } =
    useBabaMutation(setBabas)
  const { financeMutationIsPending, ...financeMutationRest } =
    useFinanceMutation(setFinances)
  const { memberMutationIsPending, ...memberMutationRest } =
    useMemberMutation(setMembers)
  const { userMutationIsPending, ...userMutationRest } = useUserMutation()

  useEffect(() => {
    if (usersData?.length && userId) {
      const babaUser = usersData.find(
        (user) => user.id === userId
      ) as TUserModel
      setBabaUser(babaUser)
    }
  }, [usersData, userId])

  useEffect(() => {
    if (!babaId && appRoutes.includes(pathname)) {
      navigate('/signin')
      return
    }
  }, [babaId, pathname, navigate])

  useEffect(() => {
    usersData && setUsers(usersData)
    babasData && setBabas(babasData)
    financesData && setFinances(financesData)
    membersData && setMembers(membersData)
  }, [usersData, babasData, financesData, membersData])

  const isLoading =
    isFetching ||
    babaMutationIsPending ||
    financeMutationIsPending ||
    memberMutationIsPending ||
    userMutationIsPending

  const isAuthenticatedInTheSelectedBaba = !!userId && userId === babaUser?.id

  return {
    isLoading,
    isAuthenticatedInTheSelectedBaba,
    userId,
    babaUser,
    setBabaUser,
    users,
    babas,
    finances,
    members,
    ...babaMutationRest,
    ...financeMutationRest,
    ...memberMutationRest,
    ...userMutationRest
  }
}
