export type TAuthParams = {
  email: string
  password: string
}

export interface IAuth {
  signIn(params: TAuthParams): Promise<void>
  signOut(): Promise<void>
}
