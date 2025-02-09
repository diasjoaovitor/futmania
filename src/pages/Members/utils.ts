import { TBaba } from '@/types'

export function someBabaIncludesMember(id: string, babas: TBaba[]) {
  return babas.some(({ teams }) =>
    teams.some(({ members }) => members.some(({ id: _id }) => _id === id))
  )
}
