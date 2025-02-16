import { TFinanceModel } from '@/models'
import { TParamsCreate, TParamsUpdate } from '@/types'

export interface IFinance {
  findAll(userId: string): Promise<TFinanceModel[]>
  create(data: TParamsCreate<TFinanceModel>): Promise<TFinanceModel>
  createMany(data: TParamsCreate<TFinanceModel>[]): Promise<TFinanceModel[]>
  update(data: TParamsUpdate<TFinanceModel>): Promise<TFinanceModel>
  delete(id: string): Promise<string>
}
