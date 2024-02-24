import { render, screen } from '@testing-library/react'
import { TMember } from '@/shared/types'
import { TMemberStats } from '@/shared/functions'
import { MemberModal } from '.'

const mockedMember: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'abc',
  id: '1'
}

const mockedStats: TMemberStats = {
  frequency: [],
  goals: 0,
  goalsAverage: 0,
  id: '1',
  numberOfBabas: 0,
  numberOfMostScore: 0,
  scoreRanking: 0,
  score: 0
}

describe('<MemberModal />', () => {
  it('should render the headings', () => {
    render(
      <MemberModal
        isOpened={true}
        finances={[]}
        member={mockedMember}
        stats={mockedStats}
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
