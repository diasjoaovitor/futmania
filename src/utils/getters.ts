import { TBaba, TMember } from '@/types'

import { getMonth, getYear } from './datetime'

const getElements = (
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) =>
  elementNames.map((elementName) =>
    e.currentTarget.elements.namedItem(elementName)
  )

export const getElementValues = (
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) => {
  const elements = getElements(e, elementNames)
  return elements.map((element) => (element as HTMLInputElement | null)?.value)
}

export const getElementsCheckedValues = (
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) => {
  const elements = getElements(e, elementNames)
  return elements.map(
    (element) => (element as HTMLInputElement | null)?.checked
  )
}

export const getMemberById = (members: TMember[], id: string) =>
  members.find(({ id: _id }) => _id === id)

export const getDistinctValues = (values: (string | number)[]) =>
  Array.from(new Set(values))

export const getBabasInSeason = (
  season: string,
  year: number,
  babas: TBaba[]
) =>
  babas.filter(({ date }) => {
    const month = getMonth(date)
    const y = getYear(date)
    const [monthFrom, monthTo] = season.split('-')
    const period = month >= Number(monthFrom) && month <= Number(monthTo)
    return (period && getYear(date) === year) || (period && y === year)
  })
