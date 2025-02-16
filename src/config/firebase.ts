import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
  apiKey: process.env.VITE_API_KEY || '.',
  authDomain: process.env.VITE_AUTH_DOMAIN || '.',
  projectId: process.env.VITE_PROJECT_ID || '.',
  storageBucket: process.env.VITE_STORAGE_BUCKET || '.',
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID || '.',
  appId: process.env.VITE_APP_ID || '.',
  measurementId: process.env.VITE_MEASUREMENT_ID || '.'
})

export const authConfig = getAuth(app)
export const db = getFirestore(app)
