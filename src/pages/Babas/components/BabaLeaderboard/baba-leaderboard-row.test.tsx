import { fireEvent, render, screen, within } from '@testing-library/react'

import { mockedMembers, mockedTeams } from '@/tests'

import { BabaLeaderboardRow } from './BabaLeaderboardRow'

describe('<BabaLeaderboardRow />', () => {
  it('should render component', () => {
    const handleClick = jest.fn()
    render(
      <table>
        <tbody>
          <BabaLeaderboardRow
            team={mockedTeams[0]}
            members={mockedMembers}
            handleClick={handleClick}
          />
        </tbody>
      </table>
    )
    const [teamCols, membersRow] = screen.getAllByRole('row')
    const [teamFirstCol, teamSecondCol, teamThirdCol, teamFourthCol] =
      within(teamCols).getAllByRole('cell')
    const expandButton = within(teamFirstCol).getByRole('button')
    expect(within(expandButton).getByTestId('ExpandMoreIcon'))
    expect(teamFirstCol.textContent).toBe('Team 1')
    expect(teamSecondCol.textContent).toBe('8')
    expect(teamThirdCol.textContent).toBe('2')
    expect(teamFourthCol.textContent).toBe('2')
    expect(within(membersRow).queryAllByRole('columnheader').length).toBe(0)
    fireEvent.click(expandButton)
    const [firstCol, secondCol] =
      within(membersRow).getAllByRole('columnheader')
    expect(firstCol.textContent).toBe('Nome')
    expect(secondCol.textContent).toBe('Gols')

    const [, firstMemberRow, secondMemberRow] =
      within(membersRow).getAllByRole('row')

    const [firstMemberName, firstMemberGoals] =
      within(firstMemberRow).getAllByRole('cell')
    expect(firstMemberName.textContent).toBe('João')
    expect(firstMemberGoals.textContent).toBe('2')

    const [secondMemberName, secondMemberGoals] =
      within(secondMemberRow).getAllByRole('cell')
    expect(secondMemberName.textContent).toBe('Vitor')
    expect(secondMemberGoals.textContent).toBe('0')
  })
})
