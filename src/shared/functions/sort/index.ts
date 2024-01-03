import { TMember } from '@/shared/types'

export function sortNumberDesc(values: number[]) {
  return values.sort((a, b) => b - a)
}

export function sortMembersByName(members: TMember[]) {
  return members.sort((a, b) => a.name.localeCompare(b.name))
}
