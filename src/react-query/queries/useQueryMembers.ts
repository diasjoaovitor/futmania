import { useQuery } from '@tanstack/react-query'

import { getMembers } from '@/firebase'

export function useQueryMembers(id: string | undefined) {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => (id ? await getMembers(id) : null),
    enabled: !!id
  })

  error && console.error({ error })

  return { data, isError, isPending }
}
