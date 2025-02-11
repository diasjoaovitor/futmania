import { useMutation } from '@tanstack/react-query'

import { updateFinance } from '@/firebase'
import { TFinance } from '@/types'

export function useMutationUpdateFinance() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['updateFinance'],
    mutationFn: async (finance: TFinance) => {
      await updateFinance(finance)
      return finance
    }
  })

  error && console.error({ error })

  return { data, mutate, isPending, isError }
}
