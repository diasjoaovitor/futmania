import { useMediaQuery } from '@mui/material'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link } from 'react-router-dom'

import { Explorer, SignIn } from '@/pages'
import {
  BabaService,
  FinanceService,
  MemberService,
  UserService
} from '@/services'
import {
  memoryRouter,
  mockedBabas,
  mockedFinances,
  mockedMember,
  mockedMembers,
  mockedUsers
} from '@/tests'

import { Members } from '.'

jest.mock('@/services/member')
jest.mock('@/services/baba')
jest.mock('@/services/finance')

let user: {
  emailVerified: boolean
  uid: string
} | null = null

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn()
}))

const mockedUseMediaQuery = useMediaQuery as jest.Mock<boolean>

const mockedFindAllMembers = jest.spyOn(MemberService.prototype, 'findAll')
const mockedCreateMember = jest.spyOn(MemberService.prototype, 'create')
const mockedUpdateMember = jest.spyOn(MemberService.prototype, 'update')
const mockedDeleteMember = jest.spyOn(MemberService.prototype, 'delete')

const mockedFindAllBabas = jest.spyOn(BabaService.prototype, 'findAll')
const mockedFindAllFinances = jest.spyOn(FinanceService.prototype, 'findAll')
const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')

const setup = () =>
  memoryRouter(
    [
      {
        path: '/members',
        element: <Members />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/explorer',
        element: <Explorer />
      },
      {
        path: '/',
        element: <Link to="/members">Navigate to members page</Link>
      }
    ],
    {
      initialEntries: ['/members']
    }
  )

describe('<Members />', () => {
  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
  })

  it('should redirect to the signin page when there is no authentication and show all the following pages in the initial state', async () => {
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Sign In' })
      ).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('link', { name: 'Entrar como visitante' }))
    expect(
      screen.getByRole('heading', { name: 'Explorar Babas' })
    ).toBeInTheDocument()
    fireEvent.click(screen.getByText('Baba Test'))
    fireEvent.click(screen.getByText('Navigate to members page'))
    expect(screen.getByText('Não há membros cadastrados')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Cadastrar Membros/i })
    ).not.toBeInTheDocument()
  })

  it('should render ordered and pending payment styled member list', async () => {
    user = { emailVerified: true, uid: '1' }
    mockedFindAllMembers.mockResolvedValue(mockedMembers)
    mockedFindAllBabas.mockResolvedValue(mockedBabas)
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Membros Fixos/i })
      ).toBeInTheDocument()
    })
    expect(
      screen.getByRole('heading', { name: /Goleiros/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Membros Avulsos/i })
    ).toBeInTheDocument()

    // fixed members
    expect(screen.getByText('1 - Abel')).toBeInTheDocument()
    expect(screen.getByText('2 - Endrick')).toBeInTheDocument()
    const joao = screen.getByText('3 - João')
    expect(joao).toBeInTheDocument()
    expect(joao.parentElement?.parentElement?.parentElement).toHaveStyle(
      'border-color: #f44336'
    )

    // goalkeepers
    expect(screen.getByText('1 - Vitor')).toBeInTheDocument()
    const weverton = screen.getByText('2 - Weverton')
    expect(weverton).toBeInTheDocument() // exempt payment because 0 babas
    expect(weverton.parentElement?.parentElement?.parentElement).toHaveStyle(
      'border-color: #ce93d8'
    )

    // non-members
    expect(screen.getByText('1 - Dudu')).toBeInTheDocument()
    const pedro = screen.getByText('2 - Pedro')
    expect(pedro).toBeInTheDocument()
    expect(pedro.parentElement?.parentElement?.parentElement).toHaveStyle(
      'border-color: #f44336'
    )

    expect(screen.getAllByText('Pagamento pendente')).toHaveLength(6)
  })

  it('should render paid member list', async () => {
    mockedFindAllFinances.mockResolvedValue(mockedFinances)

    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      const joao = screen.getByText('3 - João')
      expect(joao).toBeInTheDocument()
      expect(joao.parentElement?.parentElement?.parentElement).toHaveStyle(
        'border-color: #90caf9'
      )
    })
  })

  it('should render the list of non-members compactly', async () => {
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Membros Avulsos/i })
      ).toBeInTheDocument()
    })
    expect(
      screen.queryByRole('button', { name: /Ver mais/i })
    ).not.toBeInTheDocument()
  })

  it('should render the list of non-members completely', async () => {
    mockedFindAllMembers.mockResolvedValue(
      mockedMembers.map((member) => ({
        ...member,
        isFixedMember: false
      }))
    )
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /Membros Avulsos/i })
      ).toBeInTheDocument()
      const more = screen.getByRole('button', { name: /Ver mais/i })
      expect(more).toBeInTheDocument()
      fireEvent.click(more)
    })
    expect(screen.getByText('7 - Weverton')).toBeInTheDocument()
    const less = screen.getByRole('button', { name: /Ver menos/i })
    fireEvent.click(less)
    expect(screen.queryByText('7 - Weverton')).not.toBeInTheDocument()
  })

  it('should create a new member successfully', async () => {
    mockedCreateMember.mockResolvedValue({
      ...mockedMember,
      name: 'Gustavo Gomes',
      id: '9'
    })
    const { Component } = setup()
    render(<Component />)
    const button = screen.getByRole('button', { name: /Cadastrar Membros/i })
    fireEvent.click(button)
    const name = screen.getByLabelText('Nome') as HTMLInputElement
    expect(name.value).toBe('')
    const save = screen.getByRole('button', { name: 'Salvar' })
    await userEvent.click(save)
    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
    await userEvent.type(name, 'Gustavo Gomes')
    await userEvent.click(save)
    expect(
      screen.getByText('Membro cadastrado com sucesso!')
    ).toBeInTheDocument()
    expect(screen.getByText('1 - Gustavo Gomes')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render an alert message when create a new member fails', async () => {
    mockedCreateMember.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    render(<Component />)
    const button = screen.getByRole('button', { name: /Cadastrar Membros/i })
    fireEvent.click(button)
    const name = screen.getByLabelText('Nome') as HTMLInputElement
    const save = screen.getByRole('button', { name: 'Salvar' })
    await userEvent.type(name, 'João')
    await userEvent.click(save)
    expect(
      screen.getByText('Um membro de nome João já existe')
    ).toBeInTheDocument()
    await userEvent.type(name, '2')
    await userEvent.click(save)
    expect(screen.getByText('Erro ao cadastrar membro')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render member stats', async () => {
    const { Component } = setup()
    render(<Component />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    expect(screen.getByRole('heading', { name: 'Editar Membro' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ver Estatísticas' }))
    const modal = screen.getByTestId('member-stats-modal')
    expect(
      screen.getByRole('heading', { name: 'João', level: 2 })
    ).toBeInTheDocument()
    expect(
      within(modal).getByText('Estatísticas').parentElement?.textContent
    ).toBe('EstatísticasBabas3Capas0Pontos24Gols6')
  })

  it('should update a member successfully', async () => {
    mockedUpdateMember.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...mockedMember,
            name: 'João Dias'
          })
        }, 100)
      })
    })
    const { Component } = setup()
    render(<Component />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    expect(screen.getByRole('heading', { name: 'Editar Membro' }))
    const name = screen.getByLabelText('Nome') as HTMLInputElement
    expect(name.value).toBe('João')
    const isFixedMember = screen.getByLabelText('Fixo') as HTMLInputElement
    expect(isFixedMember.checked).toBe(false)
    const isGoalkeeper = screen.getByLabelText('Goleiro') as HTMLInputElement
    expect(isGoalkeeper.checked).toBe(false)
    const save = screen.getByRole('button', { name: 'Salvar' })
    await userEvent.click(save)
    await waitFor(() => {
      expect(
        screen.getByText('Membro atualizado com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.getByText('1 - João Dias')).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when update a member fails', async () => {
    mockedUpdateMember.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    render(<Component />)
    fireEvent.click(screen.getByRole('button', { name: /João/i }))
    const name = screen.getByLabelText('Nome') as HTMLInputElement
    const save = screen.getByRole('button', { name: 'Salvar' })
    await userEvent.clear(name)
    await userEvent.type(name, 'Dudu')
    await userEvent.click(save)
    expect(
      screen.getByText('Um membro de nome Dudu já existe')
    ).toBeInTheDocument()
    await userEvent.type(name, '2')
    await userEvent.click(save)
    expect(screen.getByText('Erro ao atualizar membro')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should delete a member successfully', async () => {
    mockedDeleteMember.mockResolvedValue('7')
    const { Component } = setup()
    render(<Component />)
    fireEvent.click(screen.getByRole('button', { name: /Ver mais/i }))
    fireEvent.click(screen.getByRole('button', { name: /Weverton/i }))
    fireEvent.click(screen.getByRole('button', { name: /Excluir Membro/i }))
    expect(screen.getByText('Deseja realmente excluir Weverton?'))
    fireEvent.click(screen.getByRole('button', { name: /Sim/i }))
    await waitFor(() => {
      expect(
        screen.getByText('Membro excluído com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.queryByText(/Weverton/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.getByText(/Ver menos/i)).toBeInTheDocument()
  })

  it('should render an alert message when deleting a member fails', async () => {
    mockedDeleteMember.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    render(<Component />)
    fireEvent.click(screen.getByRole('button', { name: /João/i }))
    fireEvent.click(screen.getByRole('button', { name: /Excluir Membro/i }))
    expect(screen.getByText('Deseja realmente excluir João?'))
    fireEvent.click(screen.getByRole('button', { name: /Sim/i }))
    expect(
      screen.getByText('João já está vinculado a um baba')
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText('4 - João')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('close-editar-membro'))
    fireEvent.click(screen.getByText(/Ver mais/i))
    fireEvent.click(screen.getByText(/Zidane/i))
    fireEvent.click(screen.getByRole('button', { name: /Excluir Membro/i }))
    expect(screen.getByText('Deseja realmente excluir Zidane?'))
    fireEvent.click(screen.getByText(/Sim/i))
    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir membro')).toBeInTheDocument()
    })
    expect(screen.getByText('8 - Zidane')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should not render action buttons in another baba', () => {
    mockedFindAllBabas.mockResolvedValue(
      mockedBabas.map((baba) => ({
        ...baba,
        userId: '2',
        teams: [
          ...baba.teams.map((team) => ({
            ...team,
            members: team.members.map((member) => ({
              ...member,
              memberId: member.memberId + '1'
            }))
          }))
        ]
      }))
    )
    mockedFindAllMembers.mockResolvedValue(
      mockedMembers.map((member) => ({
        ...member,
        userId: '2'
      }))
    )
    mockedUseMediaQuery.mockReturnValue(true)
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(screen.getByText(/Explorar Babas/i))
    expect(router.state.location.pathname).toBe('/explorer')
    fireEvent.click(screen.getByText('Other Baba'))
    fireEvent.click(screen.getByText('Navigate to members page'))
    fireEvent.click(screen.getByRole('button', { name: '4 - João' }))
    expect(screen.getByTestId('member-stats-modal')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Cadastrar Membros/i })
    ).not.toBeInTheDocument()
  })
})
