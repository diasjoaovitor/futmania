import { TFrequency, getDistinctValues, getYearMonth } from '@/utils'
import { TFinance } from '@/types'

type TPaymentData = {
  yearMonth: string
  babas: number
  payment: number
  exemptPayment?: boolean
}

export const getPayments = (finances: TFinance[], memberId: string) =>
  finances.filter(({ memberId: mId }) => mId === memberId)

export const getPaymentsData = (
  frequency: TFrequency[],
  payments: TFinance[]
) => {
  const yearMonths = getDistinctValues(
    frequency.map(({ date }) => getYearMonth(date))
  ) as string[]
  const data = yearMonths.map((yearMonth) => {
    const babas = frequency.filter(
      ({ date, showedUp }) => getYearMonth(date) === yearMonth && showedUp
    ).length
    const p = payments.filter(({ date }) => getYearMonth(date) === yearMonth)
    payments = payments.filter(({ date }) => getYearMonth(date) !== yearMonth)
    const value = p.reduce((total, { value }) => (total += Number(value)), 0)
    const data: TPaymentData = {
      yearMonth,
      babas,
      exemptPayment: babas === 0,
      payment: value
    }
    return data
  })
  payments.forEach(({ date, value }) =>
    data.push({ babas: 0, yearMonth: getYearMonth(date), payment: value })
  )
  return data.sort((a, b) => b.yearMonth.localeCompare(a.yearMonth))
}
