import { TBabaModel, TMemberModel } from '@/models'

export const someBabaIncludesMember = (id: string, babas: TBabaModel[]) =>
  babas.some(({ teams }) =>
    teams.some(({ members }) => members.some(({ memberId }) => memberId === id))
  )

export const memberAlreadyExists = (
  memberName: string,
  members: TMemberModel[]
) => members.some(({ name }) => memberName.toLowerCase() === name.toLowerCase())
