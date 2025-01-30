import { TBabaModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'

export interface IBaba {
  findAll(userId: string): Promise<TBabaModel[]>
  create(data: TParamsCreate<TBabaModel>): Promise<TBabaModel>
  update(data: TParamsUpdate<TBabaModel>): Promise<TBabaModel>
  delete(id: string): Promise<string>
}
