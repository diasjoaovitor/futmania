import { fireEvent, render, screen, within } from '@testing-library/react'
import { TBaba, TMember } from '@/shared/types'
import { ThemeProvider } from '@/shared/contexts'
import { BabaForm } from '.'

const mockedBaba: TBaba = {
  createdAt: '2024',
  date: '2024-01-25',
  teams: [
    {
      draws: 2,
      members: [
        {
          id: '1',
          goals: 2
        },
        {
          id: '2',
          goals: 0
        }
      ],
      name: 'Time 1',
      wins: 2
    },
    {
      draws: 2,
      members: [
        {
          id: '3',
          goals: 0
        },
        {
          id: '4',
          goals: 1
        }
      ],
      name: 'Time 2',
      wins: 1
    }
  ],
  userId: 'abc',
  id: '2'
}

const member: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'a',
  id: '1'
}

const mockedMembers: TMember[] = [
  member,
  {
    ...member,
    name: 'Vitor',
    isGoalkeeper: true,
    id: '2'
  },
  {
    ...member,
    name: 'Pedro',
    isFixedMember: false,
    id: '3'
  },
  {
    ...member,
    name: 'Abel',
    id: '4'
  },
  {
    ...member,
    name: 'Marcos',
    id: '5'
  }
]

function Component({ handleUpdate }: { handleUpdate: () => void }) {
  return (
    <ThemeProvider>
      <BabaForm
        baba={mockedBaba}
        handleClose={jest.fn()}
        handleUpdate={handleUpdate}
        isOpened={true}
        members={mockedMembers}
      />
    </ThemeProvider>
  )
}

describe('<BabaForm />', () => {
  it('should render the heading "Edit Baba" and the correct date and call the handleUpdate function when clicking the "Save" button', () => {
    const handleUpdate = jest.fn()
    render(<Component handleUpdate={handleUpdate} />)

    expect(
      screen.getByRole('heading', { name: 'Editar Baba' })
    ).toBeInTheDocument()

    expect((screen.getByLabelText('Data') as HTMLInputElement).value).toBe(
      '25/01/2024'
    )

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(handleUpdate).toHaveBeenCalled()
  })

  it('should render 2 teams, the team name and its members, goals, wins and draws correctly', () => {
    render(<Component handleUpdate={jest.fn()} />)

    const list = screen.getAllByRole('list')
    expect(list.length).toBe(2)

    const [teamOne, teamTwo] = list
    const [firstTeamSubheader, firstMemberInTeamOne, secondMemberInTeamOne] =
      within(teamOne).getAllByRole('listitem')

    expect(within(firstTeamSubheader).getByText('Time 1'))
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
    expect(within(secondTeamSubheader).getByText('Time 2'))
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
    render(<Component handleUpdate={jest.fn()} />)
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

    fireEvent.click(modal.getByText('Marcos'))
    expect(
      within(
        screen.getByRole('checkbox', { checked: true }).parentElement
          ?.parentElement as HTMLElement
      ).getByText('Marcos')
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
    expect(screen.getByText('Marcos')).toBeInTheDocument()
  })
})
