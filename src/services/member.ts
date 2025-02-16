import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { db } from '@/config'
import { IMember } from '@/interfaces'
import { TMemberModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'
import { getTimestamp } from '@/utils'

const path = 'members'

export class MemberService implements IMember {
  async findAll(userId: string): Promise<TMemberModel[]> {
    const q = query(collection(db, path), where('userId', '==', userId))
    const { docs } = await getDocs(q)
    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return data as TMemberModel[]
  }

  async create(data: TParamsCreate<TMemberModel>): Promise<TMemberModel> {
    const timestamp = getTimestamp()
    const value: Omit<TMemberModel, 'id'> = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const { id } = await addDoc(collection(db, path), value)
    return { ...value, id }
  }

  async update(data: TParamsUpdate<TMemberModel>): Promise<TMemberModel> {
    const timestamp = getTimestamp()
    const value: TMemberModel = {
      ...data,
      updatedAt: timestamp
    }
    await updateDoc(doc(db, path, data.id), value)
    return value
  }

  async delete(id: string): Promise<string> {
    await deleteDoc(doc(db, path, id))
    return id
  }
}
