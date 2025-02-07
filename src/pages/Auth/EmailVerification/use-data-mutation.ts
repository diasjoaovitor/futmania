import { useMutation } from '@tanstack/react-query'

import { useNotificationContext } from '@/contexts'
import { AuthService } from '@/services'

const authService = new AuthService()

export const useDataMutation = ({
  handleDisabled
}: {
  handleDisabled(): void
}) => {
  const notification = useNotificationContext()
  const { isPending, isSuccess, mutate } = useMutation({
    mutationKey: ['resendEmailVerification'],
    mutationFn: authService.resendEmailVerification,
    onSuccess: () => {
      notification({
        severity: 'success',
        title: 'Email de verificação reenviado com sucesso!'
      })
      handleDisabled()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Não foi possível reenviar o email de verificação'
      })
    }
  })

  return { isPending, isSuccess, mutate }
}
