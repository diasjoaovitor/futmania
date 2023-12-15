import { fireEvent, render, screen } from '@testing-library/react'
import { TMember } from '@/shared/types'
import { MembersList } from '.'

const mockedMembers: TMember[] = [
  {
    createdAt: '2023',
    isFixedMember: true,
    isGoalkeeper: false,
    name: 'João',
    userId: 'a',
    id: '1'
  },
  {
    createdAt: '2023',
    isFixedMember: true,
    isGoalkeeper: false,
    name: 'Vitor',
    userId: 'a',
    id: '2'
  }
]
describe('<MembersList />', () => {
  it('should render component', () => {
    const handleClick = jest.fn()
    render(
      <MembersList
        title="MembersList"
        members={mockedMembers}
        color="#00f"
        handleClick={handleClick}
      />
    )
    expect(
      screen.getByRole('heading', { name: /MembersList/i })
    ).toBeInTheDocument()
    expect(screen.getByText('1 - João')).toBeInTheDocument()
    expect(screen.getByText('2 - Vitor')).toBeInTheDocument()
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
    expect(button.parentElement).toHaveStyle('border-color: #00f;')
  })
})
