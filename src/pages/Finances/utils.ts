import { TFinance } from '@/types'
import { getYear, getYearMonth } from '@/utils'

export function getWallet(finances: TFinance[], date: string) {
  const yearMonth = getYearMonth(date)
  const incomesInMonth: TFinance[] = []
  const expensesInMonth: TFinance[] = []
  const years = new Set<number>()
  let totalIncomesInMonth = 0
  let totalExpensesInMonth = 0
  let totalIncomes = 0
  let totalExpenses = 0
  let a = 0
  finances.forEach((finance) => {
    const { date, type, value, memberId } = finance
    years.add(getYear(date))
    const ym = getYearMonth(date)
    const v = Number(value)
    if (type === '+') {
      totalIncomes += v
      if (ym === yearMonth) {
        memberId && a++
        incomesInMonth.push(finance)
        totalIncomesInMonth += v
      }
      return
    }
    totalExpenses += v
    if (ym === yearMonth) {
      expensesInMonth.push(finance)
      totalExpensesInMonth += v
    }
  })
  const balance = totalIncomes - totalExpenses
  return {
    incomesInMonth,
    totalIncomesInMonth,
    totalIncomes,
    expensesInMonth,
    totalExpensesInMonth,
    totalExpenses,
    balance,
    years: Array.from(years)
  }
}

export function sortFinances(finances: TFinance[]) {
  return finances.sort((a, b) => {
    return a.date !== b.date
      ? b.date.localeCompare(a.date)
      : a.description.localeCompare(b.description)
  })
}

export function getPayments(finances: TFinance[]) {
  return finances.filter(({ memberId }) => memberId)
}
