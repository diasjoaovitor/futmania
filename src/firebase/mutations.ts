import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch
} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

import { db } from '@/config'
import { TBaba, TFinance, TMember } from '@/types'

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

export async function createFinance(finance: TFinance) {
  const { id } = await addDoc(collection(db, 'finances'), finance)
  return id
}

export async function createFinances(finances: TFinance[]) {
  const batch = writeBatch(db)
  finances.forEach((finance) => {
    const ref = doc(db, 'finances', uuid())
    batch.set(ref, finance)
  })
  await batch.commit()
}

export async function updateFinance(finance: TFinance) {
  await updateDoc(doc(db, 'finances', finance!.id as string), finance)
}

export async function deleteFinance(id: string) {
  await deleteDoc(doc(db, 'finances', id))
}
