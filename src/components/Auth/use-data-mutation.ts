import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { useNotificationContext } from '@/contexts'
import { getAuthErrorMessage } from '@/errors'

import { TMutationFn } from './types'

export const useDataMutation = (fn: TMutationFn) => {
  const navigate = useNavigate()

  const notification = useNotificationContext()

  const fnName = fn.name

  const { isPending, mutate } = useMutation({
    mutationKey: [fnName],
    mutationFn: fn,
    onSuccess: () => {
      navigate('/')
    },
    onError: (error: unknown) => {
      console.error(error)
      notification({
        severity: 'error',
        title: `Erro ao fazer ${fnName}`,
        description: getAuthErrorMessage(error as AuthError)
      })
    }
  })

  return { isPending, mutate }
}
