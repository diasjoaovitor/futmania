import { useMutation } from '@tanstack/react-query'
import { deleteMember } from '@/firebase'

export function useMutationDeleteMember() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['deleteMember'],
    mutationFn: async (id: string) => {
      await deleteMember(id)
      return id
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
