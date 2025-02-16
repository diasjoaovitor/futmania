import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'

import { db } from '@/config'
import { IBaba } from '@/interfaces'
import { TBabaModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'
import { getTimestamp } from '@/utils'

const path = 'babas'

export class BabaService implements IBaba {
  async findAll(userId: string): Promise<TBabaModel[]> {
    const q = query(
      collection(db, path),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    )
    const { docs } = await getDocs(q)
    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return data as TBabaModel[]
  }

  async create(data: TParamsCreate<TBabaModel>): Promise<TBabaModel> {
    const timestamp = getTimestamp()
    const value: Omit<TBabaModel, 'id'> = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const { id } = await addDoc(collection(db, path), value)
    return { ...value, id }
  }

  async update(data: TParamsUpdate<TBabaModel>): Promise<TBabaModel> {
    const timestamp = getTimestamp()
    const value: TBabaModel = {
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
