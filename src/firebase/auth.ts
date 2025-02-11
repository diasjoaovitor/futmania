import { signInWithEmailAndPassword } from 'firebase/auth'

import { authConfig } from '@/config'

export async function login(email: string, password: string) {
  await signInWithEmailAndPassword(authConfig, email, password)
}

export async function logout() {
  await authConfig.signOut()
}
