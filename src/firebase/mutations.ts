import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

import { db } from '@/config'
import { TBaba, TMember } from '@/types'

export async function createMember(member: TMember) {
  const { id } = await addDoc(collection(db, 'members'), member)
  return id
}

export async function updateMember(member: TMember) {
  await updateDoc(doc(db, 'members', member!.id as string), member)
}

export async function deleteMember(id: string) {
  await deleteDoc(doc(db, 'members', id))
}

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
