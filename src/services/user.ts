import { updateProfile } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore'

import { authConfig, db } from '@/config'
import { IUser } from '@/interfaces'
import { TUserModel } from '@/models'
import { TParamsUpdate } from '@/types'
import { getTimestamp } from '@/utils'

const path = 'users'

export class UserService implements IUser {
  async findAll(): Promise<TUserModel[]> {
    const q = query(collection(db, path))
    const { docs } = await getDocs(q)
    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    return data as TUserModel[]
  }

  async create(data: TUserModel): Promise<void> {
    await setDoc(doc(db, path, data.id), data)
  }

  async update(data: TParamsUpdate<TUserModel>): Promise<void> {
    const user = authConfig.currentUser
    if (!user) {
      throw new Error('Erro ao obter o usuário autenticado')
    }
    await updateProfile(user, {
      displayName: data.name
    })
    const timestamp = getTimestamp()
    const value: TUserModel = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    }
    await updateDoc(doc(db, path, data.id), value)
  }
}
