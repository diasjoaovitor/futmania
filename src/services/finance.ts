import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

import { db } from '@/config'
import { IFinance } from '@/interfaces'
import { TFinanceModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'
import { getTimestamp } from '@/utils'

const path = 'finances'

export class FinanceService implements IFinance {
  async findAll(userId: string): Promise<TFinanceModel[]> {
    const q = query(collection(db, path), where('userId', '==', userId))
    const { docs } = await getDocs(q)
    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return data as TFinanceModel[]
  }

  async create(data: TParamsCreate<TFinanceModel>): Promise<TFinanceModel> {
    const timestamp = getTimestamp()
    const value: Omit<TFinanceModel, 'id'> = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    const { id } = await addDoc(collection(db, path), value)
    return { ...value, id }
  }

  async createMany(
    data: TParamsCreate<TFinanceModel>[]
  ): Promise<TFinanceModel[]> {
    const batch = writeBatch(db)
    const value: TFinanceModel[] = data.map((value) => {
      const id = uuid()
      const timestamp = getTimestamp()
      const ref = doc(db, path, id)
      batch.set(ref, value)
      return {
        ...value,
        id,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    })
    await batch.commit()
    return value
  }

  async update(data: TParamsUpdate<TFinanceModel>): Promise<TFinanceModel> {
    const timestamp = getTimestamp()
    const value: TFinanceModel = {
      ...data,
      updatedAt: timestamp
    }
    await updateDoc(doc(db, path, data.id as string), value)
    return value
  }

  async delete(id: string): Promise<string> {
    await deleteDoc(doc(db, path, id))
    return id
  }
}
