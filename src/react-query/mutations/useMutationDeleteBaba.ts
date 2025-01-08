import { useMutation } from '@tanstack/react-query'
import { deleteBaba } from '@/firebase'

export function useMutationDeleteBaba() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['deleteBaba'],
    mutationFn: async (id: string) => {
      await deleteBaba(id)
      return id
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
