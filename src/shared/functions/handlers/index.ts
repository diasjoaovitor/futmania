import { FocusEvent } from 'react'

export function handleFocus(e: FocusEvent<HTMLInputElement>) {
  e.target.select()
}
