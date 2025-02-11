import { useQuery } from '@tanstack/react-query'

import { getFinances } from '@/firebase'

export function useQueryFinances(id: string) {
  const { data, isError, isPending, error, refetch } = useQuery({
    queryKey: ['finances'],
    queryFn: async () => await getFinances(id)
  })

  error && console.error({ error })

  return { data, isError, isPending, refetch }
}
