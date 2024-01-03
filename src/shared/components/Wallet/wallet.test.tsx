import { render, screen } from '@testing-library/react'
import { Wallet } from '.'

describe('<Wallet />', () => {
  it('should render the heading', () => {
    render(<Wallet balance={10} expenses={5} incomes={15} />)
    expect(screen.getByText('Saldo em caixa')).toBeInTheDocument()
    expect(screen.getByText('Receitas do mês')).toBeInTheDocument()
    expect(screen.getByText('Despesas do mês')).toBeInTheDocument()
  })
})
