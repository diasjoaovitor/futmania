import dayjs from 'dayjs'

import { TMember } from '@/types'

import { TMemberStats } from './stats'

export function sortNumberDesc(values: number[]) {
  return values.sort((a, b) => b - a)
}

export function sortStringDesc(values: string[]) {
  return values.sort((a, b) => b.localeCompare(a))
}

export function sortMembersByName(members: TMember[]) {
  return members.sort((a, b) => a.name.localeCompare(b.name))
}

export function sortMembersByRanking(stats: TMemberStats[]) {
  return stats.sort((a, b) => b.scoreRanking - a.scoreRanking)
}

export function sortByGoals(data: { goals: number }[]) {
  return data.sort((a, b) => b.goals - a.goals)
}

export function sortByDate(data: { date: string }[]) {
  return data.sort((a, b) => dayjs(a.date).diff(b.date))
}
