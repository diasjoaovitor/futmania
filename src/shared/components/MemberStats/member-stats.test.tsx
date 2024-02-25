import { render, screen } from '@testing-library/react'
import { TMemberStats } from '@/shared/functions'
import { MemberStats } from '.'

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

describe('<MemberStats />', () => {
  it('should render the heading', () => {
    render(<MemberStats stats={mockedStats} />)
    expect(screen.getByText('Estatísticas')).toBeInTheDocument()
  })
})
