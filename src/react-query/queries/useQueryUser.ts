import { useQuery } from '@tanstack/react-query'

import { getUser } from '@/firebase'
import { TBabaUser } from '@/types'

export function useQueryUser(id: string | undefined) {
  const { data, isError, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (id ? await getUser(id) : ({} as TBabaUser))
  })

  error && console.error({ error })

  return { data, isError, isPending }
}
