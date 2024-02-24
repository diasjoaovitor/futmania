import { fireEvent, render, screen, within } from '@testing-library/react'
import { TFrequency } from '@/shared/functions'
import { TFinance } from '@/shared/types'
import { MemberPayments } from '.'

const mockedFrequency: TFrequency[] = [
  {
    date: '2024-02-04',
    showedUp: true
  },
  {
    date: '2024-01-28',
    showedUp: true
  },
  {
    date: '2024-01-21',
    showedUp: false
  },
  {
    date: '2024-01-14',
    showedUp: true
  },
  {
    date: '2023-12-17',
    showedUp: true
  },
  {
    date: '2023-11-26',
    showedUp: false
  }
]

const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-26',
  description: 'Description',
  type: '+',
  userId: 'abc',
  value: 1,
  id: '1'
}

const mockedFinances: TFinance[] = [
  {
    ...mockedFinance,
    memberId: '1'
  },
  {
    ...mockedFinance,
    type: '-',
    id: '2'
  },
  {
    ...mockedFinance,
    type: '-',
    value: 2,
    date: '2023-11-18',
    id: '3'
  },
  {
    ...mockedFinance,
    date: '2023-12-05',
    type: '-',
    id: '4'
  },
  {
    ...mockedFinance,
    date: '2024-01-05',
    id: '5',
    memberId: '1'
  },
  {
    ...mockedFinance,
    date: '2024-02-05',
    id: '6',
    memberId: '1'
  },
  {
    ...mockedFinance,
    date: '2023-12-05',
    id: '7',
    memberId: '1'
  }
]

describe('<MemberPayments />', () => {
  it("should render the member's payment status", () => {
    const { rerender } = render(
      <MemberPayments
        finances={mockedFinances}
        frequency={mockedFrequency}
        memberId="1"
      />
    )
    expect(screen.getByText('Pagamento em dia!')).toBeInTheDocument()
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument()

    rerender(
      <MemberPayments
        finances={mockedFinances}
        frequency={[
          ...mockedFrequency,
          {
            date: '2024-03-03',
            showedUp: true
          }
        ]}
        memberId="1"
      />
    )
    expect(screen.getByText('Pagamento pendente!')).toBeInTheDocument()
    expect(screen.getByTestId('CloseIcon')).toBeInTheDocument()
  })

  it('should render all member payments', () => {
    render(
      <MemberPayments
        finances={mockedFinances}
        frequency={mockedFrequency}
        memberId="1"
      />
    )

    fireEvent.click(screen.getByText('Pagamento em dia!'))
    const payments = screen.getAllByTestId('payment-item')
    expect(payments.length).toBe(4)

    const [a, b, c, d] = payments

    expect(within(a).getByText('Fevereiro de 2024')).toBeInTheDocument()
    expect(within(a).getByText('Babas: 1')).toBeInTheDocument()
    expect(within(a).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()

    expect(within(b).getByText('Janeiro de 2024')).toBeInTheDocument()
    expect(within(b).getByText('Babas: 2')).toBeInTheDocument()
    expect(within(b).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()

    expect(within(c).getByText('Dezembro de 2023')).toBeInTheDocument()
    expect(within(c).getByText('Babas: 1')).toBeInTheDocument()
    expect(within(c).getByText('Pagamento: R$ 2,00')).toBeInTheDocument()

    expect(within(d).getByText('Novembro de 2023')).toBeInTheDocument()
    expect(within(d).getByText('Babas: 0')).toBeInTheDocument()
    expect(within(d).getByText('Pagamento: Isento')).toBeInTheDocument()
  })
})
