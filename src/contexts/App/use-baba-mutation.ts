import { useMutation } from '@tanstack/react-query'

import { useCallbackContext, useNotificationContext } from '@/contexts'
import { TBabaModel } from '@/models'
import { BabaService } from '@/services'

const babaService = new BabaService()

export const useBabaMutation = (
  setData: React.Dispatch<React.SetStateAction<TBabaModel[]>>
) => {
  const notification = useNotificationContext()
  const { handleSuccessCallbacks, handleErrorCallbacks } = useCallbackContext()

  const {
    isPending: babaMutationCreateIsPending,
    mutate: babaMutationCreateMutate
  } = useMutation({
    mutationKey: ['createBaba'],
    mutationFn: babaService.create,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Baba criado com sucesso!'
      })
      setData((old) => [...old, data])
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao criar baba'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: babaMutationUpdateIsPending,
    mutate: babaMutationUpdateMutate
  } = useMutation({
    mutationKey: ['updateBaba'],
    mutationFn: babaService.update,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Baba atualizado com sucesso!'
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
        title: 'Erro ao atualizar baba'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: babaMutationDeleteIsPending,
    mutate: babaMutationDeleteMutate
  } = useMutation({
    mutationKey: ['deleteBaba'],
    mutationFn: babaService.delete,
    onSuccess: (id) => {
      notification({
        severity: 'success',
        title: 'Baba excluído com sucesso!'
      })
      setData((old) => old.filter((member) => member.id !== id))
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao excluir baba'
      })
      handleErrorCallbacks()
    }
  })

  const babaMutationIsPending =
    babaMutationCreateIsPending ||
    babaMutationUpdateIsPending ||
    babaMutationDeleteIsPending

  return {
    babaMutationCreateMutate,
    babaMutationUpdateMutate,
    babaMutationDeleteMutate,
    babaMutationIsPending
  }
}
