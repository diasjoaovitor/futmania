import { useMutation } from '@tanstack/react-query'

import { createMember } from '@/firebase'
import { TMember } from '@/types'

export function useMutationCreateMember() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['createMember'],
    mutationFn: async (member: TMember) => {
      const id = await createMember(member)
      return { ...member, id }
    }
  })

  error && console.error({ error })

  return { mutate, data, isPending, isError }
}
