import { TUserModel } from '@/models'
import { TParamsUpdate } from '@/types'

export interface IUser {
  findAll(): Promise<TUserModel[]>
  create(data: TUserModel): Promise<void>
  update(data: TParamsUpdate<TUserModel>): Promise<void>
}
