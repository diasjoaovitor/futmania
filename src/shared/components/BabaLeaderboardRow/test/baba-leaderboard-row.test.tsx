import { fireEvent, render, screen, within } from '@testing-library/react'
import { BabaLeaderboardRow } from '..'
import { mockedMembers, mockedTeam } from './mocks'

describe('<BabaLeaderboardRow />', () => {
  it('should render component', () => {
    const handleClick = jest.fn()
    render(
      <table>
        <tbody>
          <BabaLeaderboardRow
            team={mockedTeam}
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
    expect(teamFirstCol.textContent).toBe('Time 1')
    expect(teamSecondCol.textContent).toBe('8')
    expect(teamThirdCol.textContent).toBe('2')
    expect(teamFourthCol.textContent).toBe('2')
    expect(within(membersRow).queryAllByRole('columnheader').length).toBe(0)
    fireEvent.click(expandButton)
    const [firstCol, secondCol] =
      within(membersRow).getAllByRole('columnheader')
    expect(firstCol.textContent).toBe('Nome')
    expect(secondCol.textContent).toBe('Gols')

    const [
      _,
      firstMemberRow,
      secondMemberRow,
      thirdMemberRow,
      fourthMemberRow
    ] = within(membersRow).getAllByRole('row')

    const [firstMemberName, firstMemberGoals] =
      within(firstMemberRow).getAllByRole('cell')
    expect(firstMemberName.textContent).toBe('João')
    expect(firstMemberGoals.textContent).toBe('2')

    const [secondMemberName, secondMemberGoals] =
      within(secondMemberRow).getAllByRole('cell')
    expect(secondMemberName.textContent).toBe('Abel')
    expect(secondMemberGoals.textContent).toBe('1')

    const [thirdMemberName, thirdMemberGoals] =
      within(thirdMemberRow).getAllByRole('cell')
    expect(thirdMemberName.textContent).toBe('Vitor')
    expect(thirdMemberGoals.textContent).toBe('0')

    const [fourthMemberName, fourthMemberGoals] =
      within(fourthMemberRow).getAllByRole('cell')
    expect(fourthMemberName.textContent).toBe('Pedro')
    expect(fourthMemberGoals.textContent).toBe('0')
  })
})
