import { TFinanceType } from '@/models'

export const formatCurrencyMask = (value: number) => {
  if (!value) {
    return '0,00'
  }

  const string = ((value / 100) * 10000).toString().replace(/[^\d]/g, '')
  let number = parseInt(string)

  if (isNaN(number)) {
    return '0,00'
  }

  number = number / 100

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number)
}

export const formatCurrencyToNumber = (value: string) =>
  parseInt(value.replace(/\D/g, '')) / 100 || 0

export type TColor = { variant: 'primary' | 'error'; palette: string }

export const getColor = (type: TFinanceType) =>
  type === '-'
    ? {
        variant: 'error' as TColor['variant'],
        palette: 'error.main'
      }
    : {
        variant: 'primary' as TColor['variant'],
        palette: 'primary.main'
      }
