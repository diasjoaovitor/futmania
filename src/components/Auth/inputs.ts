export type TSignInInput = {
  label: string
  name: string
  type: 'email' | 'password'
}

export const signInInputs: TSignInInput[] = [
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

export type TSignUpInput = {
  label: string
  name: string
  type: 'text' | 'email' | 'password'
}

export const signUpInputs: TSignUpInput[] = [
  {
    label: 'Nome do Baba',
    name: 'name',
    type: 'text'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  },
  {
    label: 'Senha',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Confirmar senha',
    name: 'confirmPassword',
    type: 'password'
  }
]
