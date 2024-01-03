import { render, screen, within } from '@testing-library/react'
import { TMember } from '@/shared/types'
import { MembersCheckboxListModal } from '.'

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

describe('<Members Checkbox List Modal />', () => {
  it('should render the heading', () => {
    render(
      <MembersCheckboxListModal
        title="Members Checkbox List Modal"
        members={mockedMembers}
        checkedMembers={[]}
        finances={[]}
        handleChange={jest.fn()}
        handleClose={jest.fn()}
        isOpened={true}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Members Checkbox List Modal' })
    ).toBeInTheDocument()
    const [members, goalkeepers, nonMembers] = screen.getAllByRole('list')
    expect(within(members).getByText('Membros Fixos'))
    expect(within(members).getByText('João'))
    expect(within(goalkeepers).getByText('Goleiros'))
    expect(within(goalkeepers).getByText('Dias'))
    expect(within(nonMembers).getByText('Membros Avulsos'))
    expect(within(nonMembers).getByText('Vitor'))
  })
})
