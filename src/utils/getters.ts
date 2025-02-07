import { TBabaModel, TMemberModel } from '@/models'

import { getMonth, getYear } from '.'

const getElements = (
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) => {
  return elementNames.map((elementName) => {
    const element = e.currentTarget.elements.namedItem(elementName)
    return element
  })
}

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

export const getMemberById = (members: TMemberModel[], id: string) =>
  members.find(({ id: _id }) => _id === id)

export const getDistinctValues = (values: (string | number)[]) =>
  Array.from(new Set(values))

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
