import { currentDate } from '@/shared/states'
import { TFinance } from '@/shared/types'

export const defaultFinanceState = {
  date: currentDate,
  type: '-',
  value: 0,
  description: ''
} as TFinance
