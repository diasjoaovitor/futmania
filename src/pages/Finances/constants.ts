import { TFinance } from '@/types'
import { getCurrentDate } from '@/utils'

const currentDate = getCurrentDate()

export const defaultFinanceState = {
  date: currentDate,
  type: '-',
  value: 0,
  description: ''
} as TFinance
