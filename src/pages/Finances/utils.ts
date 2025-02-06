import { TFinanceModel } from '@/models'
import { getCurrentDate, getYear, getYearMonth } from '@/utils'

export const getWallet = (finances: TFinanceModel[], yearMonth: string) => {
  const incomesInMonth: TFinanceModel[] = []
  const expensesInMonth: TFinanceModel[] = []
  const years = new Set<number>([getYear(getCurrentDate())])
  let totalIncomesInMonth = 0
  let totalExpensesInMonth = 0
  let totalIncomes = 0
  let totalExpenses = 0
  finances.forEach((finance) => {
    const { date, type, value } = finance
    years.add(getYear(date))
    const ym = getYearMonth(date)
    const v = Number(value)
    if (type === '+') {
      totalIncomes += v
      if (ym === yearMonth) {
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

export const sortFinances = (finances: TFinanceModel[]) =>
  finances.sort((a, b) => {
    return a.date !== b.date
      ? b.date.localeCompare(a.date)
      : a.description.localeCompare(b.description)
  })

export const getPayments = (finances: TFinanceModel[]) =>
  finances.filter(({ memberId }) => memberId)
