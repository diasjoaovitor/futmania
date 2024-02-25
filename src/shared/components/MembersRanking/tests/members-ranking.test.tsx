import { fireEvent, render, screen } from '@testing-library/react'
import { MembersRanking } from '..'
import { mockedStats } from './mocks'

describe('<MembersRanking />', () => {
  it('should render the headings and call handleClick after click', () => {
    const handleClick = jest.fn()
    render(<MembersRanking stats={mockedStats} handleClick={handleClick} />)
    expect(
      screen.getByRole('heading', { name: 'Ranking', level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Artilharia', level: 2 })
    ).toBeInTheDocument()
    const [a, b] = screen.getAllByText('Dias')
    fireEvent.click(a)
    expect(handleClick).toHaveBeenCalled()
    fireEvent.click(b)
    expect(handleClick).toHaveBeenCalled()
  })
})
