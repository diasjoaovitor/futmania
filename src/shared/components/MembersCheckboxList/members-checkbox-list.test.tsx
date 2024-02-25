import { fireEvent, render, screen, within } from '@testing-library/react'
import { TFinance, TMember } from '@/shared/types'
import { palette } from '@/shared/themes'
import { MembersCheckboxList } from '.'

const mockedMember: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'abc',
  id: '1'
}

const mockedMembers: TMember[] = [
  mockedMember,
  {
    ...mockedMember,
    name: 'Vitor',
    isFixedMember: false,
    id: '2'
  },
  {
    ...mockedMember,
    name: 'Dias',
    isGoalkeeper: true,
    id: '3'
  }
]

const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-26',
  description: 'Pagamento de João',
  type: '+',
  userId: 'abc',
  value: 10,
  id: '1',
  memberId: '1'
}

const mockedFinances: TFinance[] = [
  mockedFinance,
  {
    ...mockedFinance,
    description: 'Pagamento de Vitor',
    id: '2',
    memberId: '2'
  }
]

describe('<MembersCheckboxList />', () => {
  it('should render the checked members and also assign the blue color to the paid members and the red color to the unpaid member', () => {
    const handleChange = jest.fn()
    render(
      <MembersCheckboxList
        title="Members Checkbox List"
        checkedMembers={['1', '2']}
        finances={mockedFinances}
        members={mockedMembers}
        handleChange={handleChange}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Members Checkbox List' })
    ).toBeInTheDocument()
    const [dias, joao, vitor] = screen.getAllByRole('listitem')
    expect(dias).toHaveStyle(`border-color: ${palette.red}`)
    expect(within(dias).getByRole('checkbox')).not.toHaveAttribute('checked')
    expect(joao).toHaveStyle(`border-color: ${palette.blue}`)
    expect(within(joao).getByRole('checkbox')).toHaveAttribute('checked')
    expect(vitor).toHaveStyle(`border-color: ${palette.blue}`)
    expect(within(vitor).getByRole('checkbox')).toHaveAttribute('checked')
    fireEvent.click(joao.querySelector('label') as HTMLElement)
    expect(handleChange).toBeCalled()
  })
})
