import { fireEvent, render, screen } from '@testing-library/react'
import { palette } from '@/shared/themes'
import { mockedFinance } from '@/shared/tests'
import { FinancesListItem } from '.'

describe('<FinancesListItem />', () => {
  it('should render income finance with correctly presentation', () => {
    const handleClick = jest.fn()
    render(
      <FinancesListItem finance={mockedFinance} handleClick={handleClick} />
    )
    expect(screen.getByText('Receita')).toBeInTheDocument()
    expect(screen.getByText('12 de dezembro')).toBeInTheDocument()
    expect(screen.getByText('First Income')).toBeInTheDocument()
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
