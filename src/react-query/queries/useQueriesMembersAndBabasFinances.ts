import { useQueries } from '@tanstack/react-query'

import { getBabas, getFinances, getMembers } from '@/firebase'

export function useQueriesMembersAndBabasAndFinances(id: string | undefined) {
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
    },
    {
      data: financesData,
      isPending: financesIsPending,
      isError: isFinancesError,
      error: financesError
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
      },
      {
        queryKey: ['finances'],
        queryFn: async () => (id ? await getFinances(id) : null),
        enabled: !!id
      }
    ]
  })

  membersError && console.error({ membersError })
  babasError && console.error({ babasError })
  financesError && console.error({ financesError })

  return {
    membersData,
    membersIsPending,
    isMembersError,
    babasData,
    babasIsPending,
    isBabasError,
    financesData,
    financesIsPending,
    isFinancesError
  }
}
