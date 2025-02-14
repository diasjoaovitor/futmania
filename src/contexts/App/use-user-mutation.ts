import { useMutation } from '@tanstack/react-query'

import { useNotificationContext } from '@/contexts'
import { TUserModel } from '@/models'
import { UserService } from '@/services'

const userService = new UserService()

export const useUserMutation = (
  setData: React.Dispatch<React.SetStateAction<TUserModel[]>>
) => {
  const notification = useNotificationContext()

  const { isPending: userMutationIsPending, mutate: userMutationUpdateMutate } =
    useMutation({
      mutationKey: ['updateUser'],
      mutationFn: userService.update,
      onSuccess: (data) => {
        notification({
          severity: 'success',
          title: 'Nome do Baba atualizado com sucesso!'
        })
        setData((old) =>
          old.map((member) => (member.id !== data.id ? member : data))
        )
      },
      onError: (error) => {
        console.error(error)
        notification({
          severity: 'error',
          title: 'Erro ao atualizar nome do Baba'
        })
      }
    })

  return {
    userMutationUpdateMutate,
    userMutationIsPending
  }
}
