import { FocusEvent } from 'react'

export const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.target.select()
}
