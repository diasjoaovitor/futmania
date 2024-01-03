import { useMutation } from '@tanstack/react-query'
import { createFinances } from '@/shared/firebase'
import { TFinance } from '@/shared/types'

export function useMutationCreateFinances() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['createFinance'],
    mutationFn: async (finances: TFinance[]) => {
      await createFinances(finances)
      return finances
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
