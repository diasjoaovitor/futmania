import { TBaba, TMember } from '@/types'
import { getMonth, getYear } from '..'

function getElements(
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) {
  return elementNames.map((elementName) => {
    const element = e.currentTarget.elements.namedItem(elementName)
    return element
  })
}

export function getElementValues(
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) {
  const elements = getElements(e, elementNames)
  return elements.map((element) => (element as HTMLInputElement | null)?.value)
}

export function getElementsCheckedValues(
  e: React.FormEvent<HTMLFormElement>,
  elementNames: string[]
) {
  const elements = getElements(e, elementNames)
  return elements.map(
    (element) => (element as HTMLInputElement | null)?.checked
  )
}

export function getMemberById(members: TMember[], id: string) {
  return members.find(({ id: _id }) => _id === id)
}

export function getDistinctValues(values: (string | number)[]) {
  return Array.from(new Set(values))
}

export function getBabasInSeason(season: string, year: number, babas: TBaba[]) {
  return babas.filter(({ date }) => {
    const month = getMonth(date)
    const y = getYear(date)
    const [monthFrom, monthTo] = season.split('-')
    const period = month >= Number(monthFrom) && month <= Number(monthTo)
    return (period && getYear(date) === year) || (period && y === year)
  })
}
