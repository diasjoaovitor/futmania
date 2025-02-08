import { currentDate } from '@/states'
import { TFinance } from '@/types'

export const defaultFinanceState = {
  date: currentDate,
  type: '-',
  value: 0,
  description: ''
} as TFinance
