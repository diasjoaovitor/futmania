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

  const { isPending, mutate } = useMutation({
    mutationKey: ['reset-password'],
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      notification({
        severity: 'success',
        title: 'Enviamos um email de recuperação de senha',
        description:
          'Verifique sua caixa de entrada, caso não encontre, verifique a caixa de spam',
        autoHideDuration: 10000
      })
      handleDisabled()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao enviar email de recuperação de senha'
      })
    }
  })

  return {
    isPending,
    mutate
  }
}
