import { TFinance } from '@/types'

export const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-12',
  description: 'First Income',
  type: '+',
  userId: 'abc',
  value: 1,
  id: '1'
}

export const mockedPayments: TFinance[] = [
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    id: '8',
    memberId: '1'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de Vitor',
    id: '2',
    memberId: '2'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    date: '2024-01-05',
    id: '3',
    memberId: '1'
  }
]

export const mockedFinances: TFinance[] = [
  ...mockedPayments,
  mockedFinance,
  {
    ...mockedFinance,
    description: 'First Expense',
    date: '2023-12-11',
    type: '-',
    id: '5'
  },
  {
    ...mockedFinance,
    description: 'Second Expense',
    type: '-',
    date: '2023-12-26',
    id: '6'
  }
]
