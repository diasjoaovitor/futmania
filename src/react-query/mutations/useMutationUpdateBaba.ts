import { useMutation } from '@tanstack/react-query'
import { updateBaba } from '@/firebase'
import { TBaba } from '@/types'

export function useMutationUpdateBaba() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['updateBaba'],
    mutationFn: async (baba: TBaba) => {
      await updateBaba(baba)
      return baba
    }
  })

  error && console.error({ error })

  return { data, mutate, isPending, isError }
}
