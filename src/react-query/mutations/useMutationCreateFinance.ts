import { useMutation } from '@tanstack/react-query'

import { createFinance } from '@/firebase'
import { TFinance } from '@/types'

export function useMutationCreateFinance() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['createFinance'],
    mutationFn: async (finance: TFinance) => {
      const id = await createFinance(finance)
      return { ...finance, id }
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
