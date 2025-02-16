import { TMemberModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'

export interface IMember {
  findAll(userId: string): Promise<TMemberModel[]>
  create(data: TParamsCreate<TMemberModel>): Promise<TMemberModel>
  update(data: TParamsUpdate<TMemberModel>): Promise<TMemberModel>
  delete(id: string): Promise<string>
}
