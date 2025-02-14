import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useNotificationContext } from '@/contexts'
import { UserService } from '@/services'

const userService = new UserService()

export const useDataFetch = () => {
  const notification = useNotificationContext()

  const {
    data: usersData,
    error: usersError,
    isError: usersIsFetching
  } = useQuery({
    queryKey: ['findAllUsers'],
    queryFn: async () => await userService.findAll()
  })

  useEffect(() => {
    if (usersError) {
      console.error(usersError)
      notification({
        severity: 'error',
        title: 'Não foi possível carregar os dados',
        description: 'Atualize a página ou tente novamente mais tarde'
      })
    }
  }, [usersError, notification])

  const isFetching = usersIsFetching

  return {
    isFetching,
    usersData
  }
}
