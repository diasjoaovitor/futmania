import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'firebase/auth'
import { useNavigate } from 'react-router'

import { useNotificationContext } from '@/contexts'
import { getAuthErrorMessage } from '@/errors'

import { TMutationProps } from './types'

export const useDataMutation = ({ fn, errorMessage }: TMutationProps) => {
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
        title: errorMessage,
        description: getAuthErrorMessage(error as AuthError)
      })
    }
  })

  return { isPending, mutate }
}
