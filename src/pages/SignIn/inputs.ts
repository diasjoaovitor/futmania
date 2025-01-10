export type TLoginInput = {
  label: string
  name: 'email' | 'password'
  type: 'email' | 'password'
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
