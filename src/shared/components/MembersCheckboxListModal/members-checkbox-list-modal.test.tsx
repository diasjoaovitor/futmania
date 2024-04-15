import { render, screen, within } from '@testing-library/react'
import { MembersCheckboxListModal } from '.'
import { mockedMembers } from '@/shared/tests'

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
    expect(within(goalkeepers).getByText('Vitor'))
    expect(within(nonMembers).getByText('Membros Avulsos'))
    expect(within(nonMembers).getByText('Pedro'))
  })
})
