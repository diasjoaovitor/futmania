import { render, screen } from '@testing-library/react'
import { TFinance } from '@/shared/types'
import { FinancesList } from '.'

const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-24',
  description: 'A Finance',
  type: '+',
  userId: 'abc',
  value: 10,
  id: '1'
}

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
    expect(screen.getByText('A Finance')).toBeInTheDocument()
    expect(screen.getByText('Another Finance')).toBeInTheDocument()
  })
})
