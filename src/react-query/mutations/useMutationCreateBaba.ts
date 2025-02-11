import { useMutation } from '@tanstack/react-query'

import { createBaba } from '@/firebase'
import { TBaba } from '@/types'

export function useMutationCreateBaba() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['createBaba'],
    mutationFn: async (baba: TBaba) => {
      const id = await createBaba(baba)
      return { ...baba, id }
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
