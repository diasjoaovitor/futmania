import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'firebase/auth'
import { AuthService } from '@/services'
import { useNotificationContext } from '@/contexts'
import { getAuthErrorMessage } from '@/errors'

const authService = new AuthService()

export const useDataMutation = () => {
  const navigate = useNavigate()

  const notification = useNotificationContext()

  const { isPending, mutate } = useMutation({
    mutationKey: ['signIn'],
    mutationFn: authService.signIn,
    onSuccess: () => {
      navigate('/')
    },
    onError: (error: unknown) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao fazer signIn',
        description: getAuthErrorMessage(error as AuthError)
      })
    }
  })

  return { isPending, mutate }
}
