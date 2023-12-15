import { useMutation } from '@tanstack/react-query'
import { createMember } from '@/shared/firebase'
import { TMember } from '@/shared/types'

export function useMutationCreateMember() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['createMember'],
    mutationFn: async (member: TMember) => {
      await createMember(member)
      return member
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
