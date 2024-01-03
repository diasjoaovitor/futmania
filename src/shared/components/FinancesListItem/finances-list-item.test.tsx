import { fireEvent, render, screen } from '@testing-library/react'
import { TFinance } from '@/shared/types'
import { palette } from '@/shared/themes'
import { FinancesListItem } from '.'

const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-24',
  description: 'A Finance',
  type: '+',
  userId: 'abc',
  value: 10,
  id: '1'
}

describe('<FinancesListItem />', () => {
  it('should render income finance with correctly presentation', () => {
    const handleClick = jest.fn()
    render(
      <FinancesListItem finance={mockedFinance} handleClick={handleClick} />
    )
    expect(screen.getByText('Receita')).toBeInTheDocument()
    expect(screen.getByText('24 de dezembro')).toBeInTheDocument()
    expect(screen.getByText('A Finance')).toBeInTheDocument()
    const li = screen.getByRole('listitem')
    expect(li).toHaveStyle(`border-color: ${palette.blue}`)
    fireEvent.click(li)
    expect(handleClick).toHaveBeenCalled()
  })

  it('should render expense finance with correctly presentation', () => {
    const handleClick = jest.fn()
    render(
      <FinancesListItem
        finance={{
          ...mockedFinance,
          type: '-',
          date: '2023-10-27'
        }}
        handleClick={handleClick}
      />
    )
    expect(screen.getByText('Despesa')).toBeInTheDocument()
    expect(screen.getByText('27 de outubro')).toBeInTheDocument()
    const li = screen.getByRole('listitem')
    expect(li).toHaveStyle(`border-color: ${palette.red}`)
  })
})
