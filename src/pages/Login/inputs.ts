import { HTMLInputTypeAttribute } from 'react'

export type TLoginInput = {
  label: string
  name: string
  type: HTMLInputTypeAttribute
}

export const inputs: TLoginInput[] = [
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Senha',
    name: 'password',
    type: 'password'
  }
]
