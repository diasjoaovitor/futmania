import { TFinanceModel } from '@/models'

import { getDistinctValues, getYearMonth, TFrequency } from '.'

type TPaymentData = {
  yearMonth: string
  babas: number
  payment: number
  exemptPayment?: boolean
}

export const getMemberPayments = (
  finances: TFinanceModel[],
  memberId: string
) => finances.filter(({ memberId: mId }) => mId === memberId)

export const getPaymentsData = (
  frequency: TFrequency[],
  payments: TFinanceModel[]
) => {
  const yearMonths = getDistinctValues<string>(
    frequency.map(({ date }) => getYearMonth(date))
  )
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

export const isNotPaid = (data: TPaymentData[]) =>
  data.some(({ exemptPayment, payment }) => !exemptPayment && !payment)
