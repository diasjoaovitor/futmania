export type TFinanceType = '+' | '-'

export type TFinanceModel = {
  id: string
  userId: string
  memberId?: string
  date: string
  description: string
  value: number
  type: TFinanceType
  createdAt: string
  updatedAt: string
}
