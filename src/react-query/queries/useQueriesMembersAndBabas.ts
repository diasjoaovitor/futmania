import { useQueries } from '@tanstack/react-query'

import { getBabas, getMembers } from '@/firebase'

export function useQueriesMembersAndBabas(id: string | undefined) {
  const [
    {
      data: membersData,
      isPending: membersIsPending,
      isError: isMembersError,
      error: membersError
    },
    {
      data: babasData,
      isPending: babasIsPending,
      isError: isBabasError,
      error: babasError
    }
  ] = useQueries({
    queries: [
      {
        queryKey: ['members'],
        queryFn: async () => (id ? await getMembers(id) : null),
        enabled: !!id
      },
      {
        queryKey: ['babas'],
        queryFn: async () => (id ? await getBabas(id) : null),
        enabled: !!id
      }
    ]
  })

  membersError && console.error({ membersError })
  babasError && console.error({ babasError })

  return {
    membersData,
    membersIsPending,
    isMembersError,
    babasData,
    babasIsPending,
    isBabasError
  }
}
