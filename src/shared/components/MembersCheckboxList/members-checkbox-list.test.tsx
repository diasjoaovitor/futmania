import { fireEvent, render, screen, within } from '@testing-library/react'
import { palette } from '@/shared/themes'
import { MembersCheckboxList } from '.'
import { mockedMembers, mockedPayments } from '@/shared/tests'

describe('<MembersCheckboxList />', () => {
  it('should render the checked members and also assign the blue color to the paid members and the red color to the unpaid member', () => {
    const handleChange = jest.fn()
    render(
      <MembersCheckboxList
        title="Members Checkbox List"
        checkedMembers={['1', '2']}
        finances={mockedPayments}
        members={mockedMembers}
        handleChange={handleChange}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Members Checkbox List' })
    ).toBeInTheDocument()

    const [abel, , , joao] = screen.getAllByRole('listitem')

    expect(abel).toHaveStyle(`border-color: ${palette.red}`)
    expect(within(abel).getByRole('checkbox')).not.toHaveAttribute('checked')

    expect(joao).toHaveStyle(`border-color: ${palette.blue}`)
    expect(within(joao).getByRole('checkbox')).toHaveAttribute('checked')

    fireEvent.click(joao.querySelector('label') as HTMLElement)
    expect(handleChange).toBeCalled()
  })
})
