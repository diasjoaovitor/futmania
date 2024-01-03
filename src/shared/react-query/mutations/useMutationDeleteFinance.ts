import { useMutation } from '@tanstack/react-query'
import { deleteFinance } from '@/shared/firebase'

export function useMutationDeleteFinance() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['deleteFinance'],
    mutationFn: async (id: string) => {
      await deleteFinance(id)
      return id
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
