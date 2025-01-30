import { useMutation } from '@tanstack/react-query'

import { useCallbackContext, useNotificationContext } from '@/contexts'
import { TFinanceModel } from '@/models'
import { FinanceService } from '@/services'

const financeService = new FinanceService()

export const useFinanceMutation = (
  setData: React.Dispatch<React.SetStateAction<TFinanceModel[]>>
) => {
  const notification = useNotificationContext()
  const { handleSuccessCallbacks, handleErrorCallbacks } = useCallbackContext()

  const {
    isPending: financeMutationCreateIsPending,
    mutate: financeMutationCreateMutate
  } = useMutation({
    mutationKey: ['createFinance'],
    mutationFn: financeService.create,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Finança criada com sucesso!'
      })
      setData((old) => [...old, data])
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao criar finança'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: financeMutationCreateManyIsPending,
    mutate: financeMutationCreateManyMutate
  } = useMutation({
    mutationKey: ['createManyFinances'],
    mutationFn: financeService.createMany,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Finança criada com sucesso!'
      })
      handleSuccessCallbacks()
      setData((old) => [...old, ...data])
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao criar as finanças'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: financeMutationUpdateIsPending,
    mutate: financeMutationUpdateMutate
  } = useMutation({
    mutationKey: ['updateFinance'],
    mutationFn: financeService.update,
    onSuccess: (data) => {
      notification({
        severity: 'success',
        title: 'Finança atualizada com sucesso!'
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
        title: 'Erro ao atualizar finança'
      })
      handleErrorCallbacks()
    }
  })

  const {
    isPending: financeMutationDeleteIsPending,
    mutate: financeMutationDeleteMutate
  } = useMutation({
    mutationKey: ['deleteFinance'],
    mutationFn: financeService.delete,
    onSuccess: (id) => {
      notification({
        severity: 'success',
        title: 'Finança excluída com sucesso!'
      })
      setData((old) => old.filter((member) => member.id !== id))
      handleSuccessCallbacks()
    },
    onError: (error) => {
      console.error(error)
      notification({
        severity: 'error',
        title: 'Erro ao excluir finança'
      })
      handleErrorCallbacks()
    }
  })

  const financeMutationIsPending =
    financeMutationCreateIsPending ||
    financeMutationCreateManyIsPending ||
    financeMutationUpdateIsPending ||
    financeMutationDeleteIsPending

  return {
    financeMutationCreateMutate,
    financeMutationCreateManyMutate,
    financeMutationUpdateMutate,
    financeMutationDeleteMutate,
    financeMutationIsPending
  }
}
