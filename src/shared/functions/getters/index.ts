import { TMember } from '@/shared/types'

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
