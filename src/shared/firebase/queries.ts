import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '.'
import { TBaba, TBabaUser, TFinance, TMember } from '@/shared/types'

async function get(collectionName: string, userId: string) {
  const q = query(collection(db, collectionName), where('userId', '==', userId))
  const { docs } = await getDocs(q)
  const data = docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data
}

export async function getMembers(userId: string) {
  const data = await get('members', userId)
  return data as TMember[]
}

export async function getBabas(userId: string) {
  const data = await get('babas', userId)
  return data as TBaba[]
}

export async function getFinances(userId: string) {
  const data = await get('finances', userId)
  return data as TFinance[]
}

export async function getUser(userId: string) {
  const q = query(collection(db, 'users'), where('id', '==', userId))
  const { docs } = await getDocs(q)
  const data = docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return data[0] as TBabaUser
}
