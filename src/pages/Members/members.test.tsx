import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { User } from 'firebase/auth'
import { AuthProvider, ThemeProvider } from '@/contexts'
import { useAuth as useAuthContext } from '@/contexts/AuthContext/useAuth'
import {
  useMutationCreateMember,
  useMutationDeleteMember,
  useMutationUpdateMember,
  useQueriesMembersAndBabasAndFinances
} from '@/react-query'
import { TBaba, TBabaUser, TFinance, TMember } from '@/types'
import { mockedBabas, mockedMember, mockedMembers } from '@/tests'
import { Members } from '.'

jest.mock('../../shared/contexts/AuthContext/useAuth')
jest.mock(
  '../../shared/react-query/queries/useQueriesMembersAndBabasAndFinances'
)
jest.mock('../../shared/react-query/mutations/useMutationCreateMember')
jest.mock('../../shared/react-query/mutations/useMutationUpdateMember')
jest.mock('../../shared/react-query/mutations/useMutationDeleteMember')

type TUseAuthContext = {
  user: User | null
  babaUser: TBabaUser
  isLoading: boolean
}

const mockedUseAuthContext =
  useAuthContext as unknown as jest.Mock<TUseAuthContext>

function mockedUseAuthContextSetup(args: TUseAuthContext | object) {
  const state: TUseAuthContext = {
    isLoading: false,
    user: { uid: '123' } as User,
    babaUser: {
      id: '123',
      name: 'Baba'
    }
  }
  mockedUseAuthContext.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

type TUseQueriesMembersAndBabasAndFinances = {
  membersData: TMember[] | undefined
  membersIsPending: boolean
  isMembersError: boolean
  babasData: TBaba[] | undefined
  babasIsPending: boolean
  isBabasError: boolean
  financesData: TFinance[] | undefined
  financesIsPending: boolean
  isFinancesError: boolean
}

const mockedUseQueriesMembersAndBabasAndFinances =
  useQueriesMembersAndBabasAndFinances as unknown as jest.Mock<TUseQueriesMembersAndBabasAndFinances>

function mockedUseQueriesMembersAndBabasAndFinancesSetup(
  args: TUseQueriesMembersAndBabasAndFinances | object
) {
  const state: TUseQueriesMembersAndBabasAndFinances = {
    membersData: mockedMembers,
    membersIsPending: false,
    isMembersError: false,
    babasData: mockedBabas,
    babasIsPending: false,
    isBabasError: false,
    financesData: [],
    financesIsPending: false,
    isFinancesError: false
  }
  mockedUseQueriesMembersAndBabasAndFinances.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

type TUseMutation = {
  mutate: any
  data: TMember | string | undefined
  isError: boolean
  isPending: boolean
}

function mockedUseMutationSetup(
  useMutation: () => TUseMutation,
  args: TUseMutation | object
) {
  const mockedUseMutation = useMutation as unknown as jest.Mock<TUseMutation>
  const state: TUseMutation = {
    mutate: jest.fn(),
    data: undefined,
    isError: false,
    isPending: false
  }
  mockedUseMutation.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

const client = new QueryClient()

function Page() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <Members />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

describe('<Members />', () => {
  beforeEach(() => {
    mockedUseAuthContextSetup({})
    mockedUseQueriesMembersAndBabasAndFinancesSetup({})
    mockedUseMutationSetup(useMutationCreateMember, {})
    mockedUseMutationSetup(useMutationUpdateMember, {})
    mockedUseMutationSetup(useMutationDeleteMember, {})
  })

  it('should render empty list', () => {
    mockedUseQueriesMembersAndBabasAndFinancesSetup({
      membersData: [],
      babasData: []
    })
    render(<Page />)
    expect(screen.getByText('Não há membros cadastrados')).toBeInTheDocument()
  })

  it('should render ordered members list', () => {
    render(<Page />)
    expect(
      screen.getByRole('heading', { name: /Membros Fixos/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Goleiros/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /Membros Avulsos/i })
    ).toBeInTheDocument()
    expect(screen.getByText('1 - Abel')).toBeInTheDocument()
    expect(screen.getByText('2 - Endrick')).toBeInTheDocument()
    expect(screen.getByText('3 - João')).toBeInTheDocument()
    expect(screen.getByText('1 - Vitor')).toBeInTheDocument()
    expect(screen.getByText('2 - Weverton')).toBeInTheDocument()
    expect(screen.getByText('1 - Dudu')).toBeInTheDocument()
    expect(screen.getByText('2 - Pedro')).toBeInTheDocument()
  })

  it('should render the list of non-members compactly and completely', () => {
    const { rerender } = render(<Page />)
    expect(
      screen.queryByRole('button', { name: /Ver mais/i })
    ).not.toBeInTheDocument()
    mockedUseQueriesMembersAndBabasAndFinancesSetup({
      membersData: mockedMembers.map((member) => ({
        ...member,
        isFixedMember: false
      }))
    })
    rerender(<Page />)
    const more = screen.getByRole('button', { name: /Ver mais/i })
    expect(more).toBeInTheDocument()
    fireEvent.click(more)
    expect(screen.getByText('7 - Weverton')).toBeInTheDocument()
    const less = screen.getByRole('button', { name: /Ver menos/i })
    fireEvent.click(less)
    expect(screen.queryByText('7 - Weverton')).not.toBeInTheDocument()
  })

  it('should not render the button to add new members when it does not have authentication', () => {
    mockedUseAuthContextSetup({ user: null })
    render(<Page />)
    expect(
      screen.queryByRole('button', { name: /Cadastrar Membros/i })
    ).not.toBeInTheDocument()
  })

  it('should create a new member successfully', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /Cadastrar Membros/i })
    fireEvent.click(button)
    const name = screen.getByLabelText('Nome *') as HTMLInputElement
    expect(name.value).toBe('')
    mockedUseMutationSetup(useMutationCreateMember, {
      data: {
        ...mockedMember,
        name: 'Gustavo Gomes',
        id: '8'
      }
    })
    rerender(<Page />)
    expect(screen.getByText('Membro criado com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('3 - Gustavo Gomes')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render an alert message when create a new member fails', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /Cadastrar Membros/i })
    fireEvent.click(button)
    expect(screen.getByRole('heading', { name: 'Cadastrar Membros' }))
    mockedUseMutationSetup(useMutationCreateMember, {
      isError: true
    })
    rerender(<Page />)
    expect(
      screen.getByText('Não foi possível criar o membro')
    ).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should update a member successfully', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    expect(screen.getByRole('heading', { name: 'Editar Membro' }))
    const name = screen.getByLabelText('Nome *') as HTMLInputElement
    expect(name.value).toBe('João')
    const isFixedMember = screen.getByLabelText('Fixo') as HTMLInputElement
    expect(isFixedMember.checked).toBe(true)
    mockedUseMutationSetup(useMutationUpdateMember, {
      data: {
        ...mockedMember,
        name: 'João Dias',
        isFixedMember: false
      }
    })
    rerender(<Page />)
    expect(screen.getByText('Membro editado com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('2 - João Dias')).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when update a member fails', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    mockedUseMutationSetup(useMutationUpdateMember, {
      isError: true
    })
    rerender(<Page />)
    expect(
      screen.getByText('Não foi possível atualizar os dados de João')
    ).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should create a new member successfully', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /Cadastrar Membros/i })
    fireEvent.click(button)
    const name = screen.getByLabelText('Nome *') as HTMLInputElement
    expect(name.value).toBe('')
    mockedUseMutationSetup(useMutationCreateMember, {
      data: {
        ...mockedMember,
        name: 'Gustavo Gomes',
        id: '8'
      }
    })
    rerender(<Page />)
    expect(screen.getByText('Membro criado com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('3 - Gustavo Gomes')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render an alert message when creating a member fails because it already exists', async () => {
    render(<Page />)
    await userEvent.click(
      screen.getByRole('button', { name: /Cadastrar Membros/i })
    )
    await userEvent.type(screen.getByRole('textbox', { name: 'Nome' }), 'João')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Não possível realizar a ação!')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Um membro de nome João já existe')
      ).toBeInTheDocument()
    })
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('should render an alert message when updating a member fails because it already exists', async () => {
    render(<Page />)
    await userEvent.click(screen.getByRole('button', { name: /João/i }))
    const name = screen.getByRole('textbox', { name: 'Nome' })
    await userEvent.clear(name)
    await userEvent.type(name, 'Vitor')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Um membro de nome Vitor já existe')
      ).toBeInTheDocument()
    })
  })

  it('should not render an alert message when updating a another value it member already exists', async () => {
    render(<Page />)
    await userEvent.click(screen.getByRole('button', { name: /João/i }))
    await userEvent.click(screen.getByRole('checkbox', { name: 'Goleiro' }))
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(
      screen.queryByText('Um membro de nome Vitor já existe')
    ).not.toBeInTheDocument()
  })

  it('should delete a member successfully', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    expect(screen.getByRole('heading', { name: 'Editar Membro' }))
    const deleteButton = screen.getByRole('button', { name: /Excluir Membro/i })
    fireEvent.click(deleteButton)
    expect(screen.getByText('Deseja realmente excluir João?'))
    mockedUseMutationSetup(useMutationDeleteMember, {
      data: '1'
    })
    rerender(<Page />)
    expect(screen.getByText('Membro excluído com sucesso!')).toBeInTheDocument()
    expect(screen.queryByText('3 - João')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when deleting a member fails because the member has already participated in a baba', async () => {
    render(<Page />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    const deleteButton = screen.getByRole('button', { name: /Excluir Membro/i })
    fireEvent.click(deleteButton)
    expect(screen.getByText('Deseja realmente excluir João?'))
    fireEvent.click(screen.getByRole('button', { name: /Sim/i }))
    expect(
      screen.getByText('João já está vinculado a um baba')
    ).toBeInTheDocument()
    expect(screen.getByText('3 - João')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })

  it('should render an alert message when delete a member fails', () => {
    const { rerender } = render(<Page />)
    const button = screen.getByRole('button', { name: /João/i })
    fireEvent.click(button)
    mockedUseMutationSetup(useMutationDeleteMember, {
      isError: true
    })
    rerender(<Page />)
    expect(
      screen.getByText('Não foi possível excluir João')
    ).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByText('3 - João')).toBeInTheDocument()
  })

  it('should render an alert message when there is an error getting the data', async () => {
    mockedUseQueriesMembersAndBabasAndFinancesSetup({
      membersData: undefined,
      isMembersError: true,
      babasData: undefined,
      isBabasError: true,
      financesData: undefined,
      isFinancesError: true
    })
    render(<Page />)
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível buscar os dados')
      ).toBeInTheDocument()
    })
  })
})
