import { render, screen } from '@testing-library/react'
import { mockedMemberStats } from '@/shared/tests'
import { MemberStats } from '.'

describe('<MemberStats />', () => {
  it('should render the heading', () => {
    render(<MemberStats stats={mockedMemberStats} />)
    expect(screen.getByText('Estatísticas')).toBeInTheDocument()
  })
})
