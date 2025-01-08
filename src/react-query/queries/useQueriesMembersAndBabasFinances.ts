import { useQueries } from '@tanstack/react-query'
import { getBabas, getFinances, getMembers } from '@/firebase'

export function useQueriesMembersAndBabasAndFinances(id: string) {
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
        queryFn: async () => await getMembers(id)
      },
      {
        queryKey: ['babas'],
        queryFn: async () => await getBabas(id)
      },
      {
        queryKey: ['finances'],
        queryFn: async () => await getFinances(id)
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
