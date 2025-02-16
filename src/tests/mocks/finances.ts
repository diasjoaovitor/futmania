import { TFinanceModel } from '@/models'

export const mockedFinance: TFinanceModel = {
  createdAt: '2023',
  updatedAt: '2023',
  date: '2023-11-12',
  description: 'First Income',
  type: '+',
  userId: '1',
  value: 1,
  id: '1'
}

export const mockedPayments: TFinanceModel[] = [
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    memberId: '1',
    id: '2'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    id: '3',
    memberId: '1',
    date: '2023-12-05'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de Vitor',
    id: '4',
    memberId: '2'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    date: '2024-01-05',
    id: '5',
    memberId: '1'
  },
  {
    ...mockedFinance,
    description: 'Pagamento de João',
    date: '2024-04-05',
    id: '6',
    memberId: '1'
  }
]

export const mockedFinances: TFinanceModel[] = [
  ...mockedPayments,
  mockedFinance,
  {
    ...mockedFinance,
    description: 'First Expense',
    date: '2023-12-11',
    type: '-',
    id: '7'
  },
  {
    ...mockedFinance,
    description: 'Second Expense',
    type: '-',
    date: '2023-12-26',
    id: '8'
  }
]
