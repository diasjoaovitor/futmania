import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '.'
import { TBaba, TFinance, TMember } from '@/shared/types'

export async function createMember(member: TMember) {
  await addDoc(collection(db, 'members'), member)
}

export async function updateMember(member: TMember) {
  await updateDoc(doc(db, 'members', member!.id as string), member)
}

export async function deleteMember(id: string) {
  await deleteDoc(doc(db, 'members', id))
}

export async function createBaba(baba: TBaba) {
  await addDoc(collection(db, 'babas'), baba)
}

export async function updateBaba(baba: TBaba) {
  await updateDoc(doc(db, 'babas', baba!.id as string), baba)
}

export async function deleteBaba(id: string) {
  await deleteDoc(doc(db, 'babas', id))
}

export async function createFinance(finance: TFinance) {
  await addDoc(collection(db, 'finances'), finance)
}

export async function updateFinance(finance: TFinance) {
  await updateDoc(doc(db, 'finances', finance!.id as string), finance)
}

export async function deleteFinance(id: string) {
  await deleteDoc(doc(db, 'finances', id))
}
