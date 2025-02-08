import { render, screen } from '@testing-library/react'
import { mockedMember, mockedMemberStats } from '@/tests'
import { MemberModal } from '.'

describe('<MemberModal />', () => {
  it('should render the headings', () => {
    render(
      <MemberModal
        isOpened={true}
        finances={[]}
        member={mockedMember}
        stats={mockedMemberStats}
        handleClose={jest.fn()}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'João', level: 2 })
    ).toBeInTheDocument()
    expect(screen.getByText('Estatísticas')).toBeInTheDocument()
    expect(screen.getByText('Frequência')).toBeInTheDocument()
    expect(screen.getByText('Mensalidade')).toBeInTheDocument()
  })
})
