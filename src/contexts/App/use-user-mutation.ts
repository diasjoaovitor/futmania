import { useMutation } from '@tanstack/react-query'

import { useNotificationContext } from '@/contexts'
import { UserService } from '@/services'

const userService = new UserService()

export const useUserMutation = () => {
  const notification = useNotificationContext()

  const { isPending: userMutationIsPending, mutate: userMutationUpdateMutate } =
    useMutation({
      mutationKey: ['updateUser'],
      mutationFn: userService.update,
      onSuccess: () => {
        notification({
          severity: 'success',
          title: 'Usuário atualizado com sucesso!'
        })
      },
      onError: (error) => {
        console.error(error)
        notification({
          severity: 'error',
          title: 'Erro ao atualizar usuário'
        })
      }
    })

  return {
    userMutationUpdateMutate,
    userMutationIsPending
  }
}
