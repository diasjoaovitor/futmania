import { render, screen, within } from '@testing-library/react'
import { mockedBaba, mockedMembers } from '@/shared/tests'
import { BabaLeaderboard } from '.'

describe('<BabaLeaderboard />', () => {
  it('should render ordered teams with correctly scoring', () => {
    const handleClick = jest.fn()
    render(
      <BabaLeaderboard
        baba={mockedBaba}
        members={mockedMembers}
        handleClick={handleClick}
      />
    )
    const [cols, firstTeamRow, _, secondTeamRow, __, thirdTeamRow] =
      screen.getAllByRole('row')

    const [firstCol, secondCol, thirdCol, fourthCol] =
      within(cols).getAllByRole('columnheader')
    expect(firstCol.textContent).toBe('Classificação')
    expect(secondCol.textContent).toBe('PTS')
    expect(thirdCol.textContent).toBe('V')
    expect(fourthCol.textContent).toBe('E')

    const [
      firstTeamFirstCol,
      firstTeamSecondCol,
      firstTeamThirdCol,
      firstTeamFourthCol
    ] = within(firstTeamRow).getAllByRole('cell')
    expect(firstTeamFirstCol.textContent).toBe('Team 3')
    expect(firstTeamSecondCol.textContent).toBe('9')
    expect(firstTeamThirdCol.textContent).toBe('3')
    expect(firstTeamFourthCol.textContent).toBe('0')

    const [
      secondTeamFirstCol,
      secondTeamSecondCol,
      secondTeamThirdCol,
      secondTeamFourthCol
    ] = within(secondTeamRow).getAllByRole('cell')
    expect(secondTeamFirstCol.textContent).toBe('Team 1')
    expect(secondTeamSecondCol.textContent).toBe('8')
    expect(secondTeamThirdCol.textContent).toBe('2')
    expect(secondTeamFourthCol.textContent).toBe('2')

    const [
      thirdTeamFirstCol,
      thirdTeamSecondCol,
      thirdTeamThirdCol,
      thirdTeamFourthCol
    ] = within(thirdTeamRow).getAllByRole('cell')
    expect(thirdTeamFirstCol.textContent).toBe('Team 2')
    expect(thirdTeamSecondCol.textContent).toBe('5')
    expect(thirdTeamThirdCol.textContent).toBe('1')
    expect(thirdTeamFourthCol.textContent).toBe('2')
  })
})
