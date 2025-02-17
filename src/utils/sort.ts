import dayjs from 'dayjs'

import { TMemberModel } from '@/models'

import { TMemberStats } from './stats'

export const sortNumberDesc = (values: number[]) => values.sort((a, b) => b - a)

export const sortStringDesc = (values: string[]) =>
  values.sort((a, b) => b.localeCompare(a))

export const sortMembersByName = (members: TMemberModel[]) =>
  members.sort((a, b) => a.name.localeCompare(b.name))

export const sortMembersByRanking = (stats: TMemberStats[]) =>
  stats.sort((a, b) => b.scoreRanking - a.scoreRanking)

export const sortByGoals = (data: { goals: number }[]) =>
  data.sort((a, b) => b.goals - a.goals)

export const sortByDate = (data: { date: string }[]) =>
  data.sort((a, b) => dayjs(a.date).diff(b.date))
