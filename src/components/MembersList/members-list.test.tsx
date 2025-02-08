import { fireEvent, render, screen } from '@testing-library/react'
import { mockedMembers } from '@/tests'
import { MembersList } from '.'

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
