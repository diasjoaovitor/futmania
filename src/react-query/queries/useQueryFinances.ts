import { useQuery } from '@tanstack/react-query'

import { getFinances } from '@/firebase'

export function useQueryFinances(id: string | undefined) {
  const { data, isError, isPending, error, refetch } = useQuery({
    queryKey: ['finances'],
    queryFn: async () => (id ? await getFinances(id) : null),
    enabled: !!id
  })

  error && console.error({ error })

  return { data, isError, isPending, refetch }
}
