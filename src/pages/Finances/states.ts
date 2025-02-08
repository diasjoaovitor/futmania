import { currentDate } from '@/constants'
import { TFinance } from '@/types'

export const defaultFinanceState = {
  date: currentDate,
  type: '-',
  value: 0,
  description: ''
} as TFinance
