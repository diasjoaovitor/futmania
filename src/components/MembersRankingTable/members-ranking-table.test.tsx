import { render, screen } from '@testing-library/react'
import { MembersRankingTable } from '.'

describe('<MembersRankingTable />', () => {
  it('should render the heading', () => {
    const handleLimit = jest.fn()
    render(
      <MembersRankingTable
        title="Members Ranking Table"
        cols={['Col 1', 'Col 2']}
        isFull={true}
        handleLimit={handleLimit}
      >
        <tr>
          <td>content</td>
        </tr>
      </MembersRankingTable>
    )
    expect(
      screen.getByRole('heading', { name: 'Members Ranking Table', level: 2 })
    ).toBeInTheDocument()
  })
})
