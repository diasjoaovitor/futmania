import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

import { db } from '@/config'
import { TBaba } from '@/types'

export async function createBaba(baba: TBaba) {
  const { id } = await addDoc(collection(db, 'babas'), baba)
  return id
}

export async function updateBaba(baba: TBaba) {
  await updateDoc(doc(db, 'babas', baba!.id as string), baba)
}

export async function deleteBaba(id: string) {
  await deleteDoc(doc(db, 'babas', id))
}
