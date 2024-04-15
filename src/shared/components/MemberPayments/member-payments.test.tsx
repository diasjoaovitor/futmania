import { fireEvent, render, screen, within } from '@testing-library/react'
import { mockedFinance, mockedFinances, mockedFrequency } from '@/shared/tests'
import { MemberPayments } from '.'

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
            date: '2024-02-11',
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
        finances={[
          ...mockedFinances,
          {
            ...mockedFinance,
            memberId: '1',
            value: 1,
            date: '2023-12-13'
          }
        ]}
        frequency={mockedFrequency}
        memberId="1"
      />
    )

    fireEvent.click(screen.getByText('Pagamento em dia!'))

    const payments = screen.getAllByTestId('payment-item')
    expect(payments.length).toBe(4)

    const [a, b, c, d] = payments

    expect(within(a).getByText('Fevereiro de 2024')).toBeInTheDocument()
    expect(within(a).getByText('Babas: 0')).toBeInTheDocument()
    expect(within(a).getByText('Pagamento: Isento')).toBeInTheDocument()

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
