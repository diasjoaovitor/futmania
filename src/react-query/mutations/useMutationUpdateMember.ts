import { useMutation } from '@tanstack/react-query'
import { updateMember } from '@/firebase'
import { TMember } from '@/types'

export function useMutationUpdateMember() {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ['updateMember'],
    mutationFn: async (member: TMember) => {
      await updateMember(member)
      return member
    }
  })

  error && console.error({ error })

  return { data, mutate, isPending, isError }
}
