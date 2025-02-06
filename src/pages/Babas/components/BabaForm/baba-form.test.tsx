import { fireEvent, render, screen, within } from '@testing-library/react'

import { ThemeProvider } from '@/contexts'
import { mockedBaba, mockedMembers } from '@/tests'

import { BabaForm } from '.'

function Component() {
  return (
    <ThemeProvider>
      <BabaForm
        baba={mockedBaba}
        handleClose={jest.fn()}
        isOpened={true}
        members={mockedMembers}
      />
    </ThemeProvider>
  )
}

describe('<BabaForm />', () => {
  it('should render the heading "Edit Baba" and the correct date and call the handleUpdate function when clicking the "Save" button', () => {
    render(<Component />)

    expect(
      screen.getByRole('heading', { name: 'Editar Baba' })
    ).toBeInTheDocument()

    expect((screen.getByLabelText('Data') as HTMLInputElement).value).toBe(
      '04/11/2023'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
  })

  it('should render 2 teams, the team name and its members, goals, wins and draws correctly', () => {
    render(<Component />)

    const list = screen.getAllByRole('list')
    expect(list.length).toBe(3)

    const [teamOne, teamTwo] = list
    const [firstTeamSubheader, firstMemberInTeamOne, secondMemberInTeamOne] =
      within(teamOne).getAllByRole('listitem')

    expect(within(firstTeamSubheader).getByText('Team 1'))
    expect(within(firstMemberInTeamOne).getByText('João')).toBeInTheDocument()
    expect(
      (firstMemberInTeamOne.querySelector('input') as HTMLInputElement).value
    ).toBe('2')
    expect(within(secondMemberInTeamOne).getByText('Vitor')).toBeInTheDocument()
    expect(
      (secondMemberInTeamOne.querySelector('input') as HTMLInputElement).value
    ).toBe('0')
    expect(
      (within(teamOne).getByLabelText('Vitórias') as HTMLInputElement).value
    ).toBe('2')
    expect(
      (within(teamOne).getByLabelText('Empates') as HTMLInputElement).value
    ).toBe('2')

    const [secondTeamSubheader, firstMemberInTeamTwo, secondMemberInTeamTwo] =
      within(teamTwo).getAllByRole('listitem')
    expect(within(secondTeamSubheader).getByText('Team 2'))
    expect(within(firstMemberInTeamTwo).getByText('Pedro')).toBeInTheDocument()
    expect(
      (firstMemberInTeamTwo.querySelector('input') as HTMLInputElement).value
    ).toBe('0')
    expect(within(secondMemberInTeamTwo).getByText('Abel')).toBeInTheDocument()
    expect(
      (secondMemberInTeamTwo.querySelector('input') as HTMLInputElement).value
    ).toBe('1')
    expect(
      (within(teamTwo).getByLabelText('Vitórias') as HTMLInputElement).value
    ).toBe('1')
    expect(
      (within(teamTwo).getByLabelText('Empates') as HTMLInputElement).value
    ).toBe('2')
  })

  it(`Should perform the following actions when clicking on the team member named "João":
      the title modal "Select Member" should be displayed;
      João must be selected;
      all other members who already belong to a team must be disabled, as in the case of "Vitor";
      when selecting "Marcos", João will no longer be selected;
      by clicking on "Save", the "Select Members" modal must be closed and Marcos will be on the team in João's place`, () => {
    render(<Component />)
    fireEvent.click(screen.getByText('João'))

    expect(screen.getByText('Selecionar Membro'))

    const modal = within(screen.getByTestId('members-checkbox-list-modal'))

    expect(
      within(
        screen.getByRole('checkbox', { checked: true }).parentElement
          ?.parentElement as HTMLElement
      ).getByText('João')
    ).toBeInTheDocument()

    expect(
      within(modal.getByText('Vitor').parentElement as HTMLElement).getByRole(
        'checkbox',
        { checked: false }
      )
    ).toHaveAttribute('disabled')

    fireEvent.click(modal.getByText('Weverton'))
    expect(
      within(
        screen.getByRole('checkbox', { checked: true }).parentElement
          ?.parentElement as HTMLElement
      ).getByText('Weverton')
    ).toBeInTheDocument()
    expect(
      within(modal.getByText('João').parentElement as HTMLElement).getByRole(
        'checkbox',
        { checked: false }
      )
    ).toBeInTheDocument()

    fireEvent.click(modal.getByRole('button', { name: 'Salvar' }))
    expect(
      screen.queryByTestId('members-checkbox-list-modal')
    ).not.toBeInTheDocument()
    expect(screen.queryByText('João')).not.toBeInTheDocument()
    expect(screen.getByText('Weverton')).toBeInTheDocument()
  })
})
