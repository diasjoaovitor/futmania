import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useNotificationContext } from '@/contexts'
import {
  BabaService,
  FinanceService,
  MemberService,
  UserService
} from '@/services'

const userService = new UserService()
const babaService = new BabaService()
const financeService = new FinanceService()
const memberService = new MemberService()

export const useDataFetch = (userId: string | undefined) => {
  const notification = useNotificationContext()

  const queries = useQueries({
    queries: [
      {
        queryKey: ['findAllUsers'],
        queryFn: async () => await userService.findAll()
      },
      {
        queryKey: ['findAllBabas', userId],
        queryFn: async () => {
          if (!userId) return
          const data = await babaService.findAll(userId)
          return data
        },
        enabled: !!userId
      },
      {
        queryKey: ['findAllFinances', userId],
        queryFn: async () => {
          if (!userId) return
          const data = await financeService.findAll(userId)
          return data
        },
        enabled: !!userId
      },
      {
        queryKey: ['findAllMembers', userId],
        queryFn: async () => {
          if (!userId) return
          const data = await memberService.findAll(userId)
          return data
        },
        enabled: !!userId
      }
    ]
  })

  const [
    { data: usersData, error: usersError },
    { data: babasData, error: babasError },
    { data: financesData, error: financesError },
    { data: membersData, error: membersError }
  ] = queries

  useEffect(() => {
    const isError = queries.some((query) => query.error)
    if (isError) {
      console.error({
        usersError,
        membersError,
        babasError,
        financesError
      })
      notification({
        severity: 'error',
        title: 'Não foi possível carregar os dados',
        description: 'Atualize a página ou tente novamente mais tarde'
      })
    }
  }, [
    queries,
    usersError,
    membersError,
    babasError,
    financesError,
    notification
  ])

  const isFetching = queries.some((query) => query.isFetching)

  return {
    isFetching,
    usersData,
    babasData,
    financesData,
    membersData
  }
}
