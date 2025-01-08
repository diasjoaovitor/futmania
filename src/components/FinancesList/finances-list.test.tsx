import { render, screen } from '@testing-library/react'
import { mockedFinance } from '@/tests'
import { FinancesList } from '.'

describe('<FinancesList />', () => {
  it('should render the heading and empty list', () => {
    render(<FinancesList finances={[]} handleClick={jest.fn()} />)
    expect(
      screen.getByRole('heading', { name: 'Finanças do Mês' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Não há finanças registradas no mês')
    ).toBeInTheDocument()
  })

  it('should render list', () => {
    render(
      <FinancesList
        finances={[
          mockedFinance,
          {
            ...mockedFinance,
            description: 'Another Finance',
            type: '-',
            id: '2'
          }
        ]}
        handleClick={jest.fn()}
      />
    )
    expect(screen.getByText('First Income')).toBeInTheDocument()
    expect(screen.getByText('Another Finance')).toBeInTheDocument()
  })
})
