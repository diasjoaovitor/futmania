import { useQuery } from '@tanstack/react-query'
import { getMembers } from '@/firebase'

export function useQueryMembers(id: string) {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getMembers(id)
  })

  error && console.error({ error })

  return { data, isError, isPending }
}
