import { TBabaModel, TMemberModel } from '@/models'

import { getMonth, getYear } from './datetime'

export const getMemberById = (members: TMemberModel[], id: string) =>
  members.find(({ id: _id }) => _id === id)

export const getDistinctValues = <T>(values: (string | number)[]) =>
  Array.from(new Set(values)) as T[]

export const getBabasInSeason = (
  season: string,
  year: number,
  babas: TBabaModel[]
) =>
  babas.filter(({ date }) => {
    const month = getMonth(date)
    const y = getYear(date)
    const [monthFrom, monthTo] = season.split('-')
    const period = month >= Number(monthFrom) && month <= Number(monthTo)
    return (period && getYear(date) === year) || (period && y === year)
  })
