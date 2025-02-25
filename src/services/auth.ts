import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'

import { authConfig } from '@/config'
import { IAuth, TSignInParams, TSignUpParams } from '@/interfaces'
import { getTimestamp } from '@/utils'

import { UserService } from './user'

export class AuthService implements IAuth {
  async signUp({ email, displayName, password }: TSignUpParams): Promise<void> {
    const { user } = await createUserWithEmailAndPassword(
      authConfig,
      email,
      password
    )
    const userService = new UserService()
    const timestamp = getTimestamp()
    await Promise.all([
      updateProfile(user, { displayName }),
      sendEmailVerification(user),
      userService.create({
        id: user.uid,
        displayName,
        createdAt: timestamp,
        updatedAt: timestamp
      })
    ])
  }

  async signIn({ email, password }: TSignInParams): Promise<void> {
    await signInWithEmailAndPassword(authConfig, email, password)
  }

  async signOut(): Promise<void> {
    await authConfig.signOut()
  }

  async resendEmailVerification() {
    const user = authConfig.currentUser
    if (user) {
      await sendEmailVerification(user)
    }
  }

  async resetPassword(email: string) {
    await sendPasswordResetEmail(authConfig, email)
  }
}
