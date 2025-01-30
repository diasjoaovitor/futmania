import { useMutation } from '@tanstack/react-query'

import { useCallbackContext, useNotificationContext } from '@/contexts'
import { TMemberModel } from '@/models'
import { MemberService } from '@/services'

const memberService = new MemberService()

export const useMemberMutation = (
  setData: React.Dispatch<React.SetStateAction<TMemberModel[]>>
) => {
  const notification = useNotificationContext()
  const { handleSuccessCallbacks, handleErrorCallbacks } = useCallbackContext()

  const {
    isPending: memberMutationCreateIsPending,
    mutate: memberMutationCreateMutate
  } = useMutation({
    mutationKey: ['createMember'],
    mutationFn: memberService.create,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Membro cadastrado com sucesso!'
      })
      setData((old) => [...old, data])
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao cadastrar membro'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: memberMutationUpdateIsPending,
    mutate: memberMutationUpdateMutate
  } = useMutation({
    mutationKey: ['updateMember'],
    mutationFn: memberService.update,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Membro atualizado com sucesso!'
      })
      setData((old) =>
        old.map((member) => (member.id !== data.id ? member : data))
      )
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao atualizar membro'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: memberMutationDeleteIsPending,
    mutate: memberMutationDeleteMutate
  } = useMutation({
    mutationKey: ['deleteMember'],
    mutationFn: memberService.delete,
    onSuccess: (id) => {
      notification({
        severity: 'success',
        title: 'Membro excluído com sucesso!'
      })
      setData((old) => old.filter((member) => member.id !== id))
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao excluir membro'
      })
      handleErrorCallbacks()
    }
  })

  const memberMutationIsPending =
    memberMutationCreateIsPending ||
    memberMutationUpdateIsPending ||
    memberMutationDeleteIsPending

  return {
    memberMutationCreateMutate,
    memberMutationUpdateMutate,
    memberMutationDeleteMutate,
    memberMutationIsPending
  }
}
