export type TSignUpParams = {
  displayName: string
  email: string
  password: string
}

export type TSignInParams = {
  email: string
  password: string
}

export interface IAuth {
  signUp(params: TSignUpParams): Promise<void>
  signIn(params: TSignInParams): Promise<void>
  signOut(): Promise<void>
  resendEmailVerification(): Promise<void>
  resetPassword(email: string): Promise<void>
}
