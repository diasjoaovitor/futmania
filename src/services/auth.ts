import { signInWithEmailAndPassword } from 'firebase/auth'
import { authConfig } from '@/config'
import { IAuth, TAuthParams } from '@/interfaces'

export class AuthService implements IAuth {
  async signIn({ email, password }: TAuthParams): Promise<void> {
    await signInWithEmailAndPassword(authConfig, email, password)
  }

  async signOut(): Promise<void> {
    await authConfig.signOut()
  }
}
