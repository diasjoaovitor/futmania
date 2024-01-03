import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { useQueryFinances, useQueryMembers } from '@/shared/react-query'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { User } from 'firebase/auth'
import { TBabaUser, TFinance, TMember } from '@/shared/types'
import { useAuth as useAuthContext } from '@/shared/contexts/AuthContext/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, ThemeProvider } from '@/shared/contexts'
import {
  createFinance,
  createFinances,
  deleteFinance,
  updateFinance
} from '@/shared/firebase'
import { Finances } from '.'
import { getMonth, getMonthExtensive, getYear } from '@/shared/functions'
import { currentDate } from '@/shared/states'

jest.mock('../../shared/contexts/AuthContext/useAuth')
jest.mock('../../shared/react-query/queries/useQueryFinances')
jest.mock('../../shared/react-query/queries/useQueryMembers')
jest.mock('../../shared/firebase/mutations')

const mockedMember: TMember = {
  createdAt: '2023',
  isFixedMember: true,
  isGoalkeeper: false,
  name: 'João',
  userId: 'abc',
  id: '1'
}

const mockedMembers: TMember[] = [
  mockedMember,
  {
    ...mockedMember,
    name: 'Vitor',
    isFixedMember: false,
    id: '2'
  },
  {
    ...mockedMember,
    name: 'Dias',
    isGoalkeeper: true,
    id: '3'
  }
]

const mockedFinance: TFinance = {
  createdAt: '2023',
  date: '2023-12-26',
  description: 'First Income',
  type: '+',
  userId: 'abc',
  value: 10,
  id: '1'
}

const mockedFinances: TFinance[] = [
  mockedFinance,
  {
    ...mockedFinance,
    description: 'Second Income',
    id: '2',
    memberId: '1'
  },
  {
    ...mockedFinance,
    description: 'First Expense',
    type: '-',
    value: 2,
    date: '2023-11-18',
    id: '3'
  },
  {
    ...mockedFinance,
    description: 'Second Expense',
    date: '2023-12-05',
    type: '-',
    id: '4'
  },
  {
    ...mockedFinance,
    date: '2024-01-05',
    description: 'Third Expense',
    type: '-',
    value: 3,
    id: '4'
  }
]

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

type TUseQuery = {
  data: TFinance[] | TMember[] | undefined
  isPending: boolean
  isError: boolean
  refetch?: () => void
}

function mockedUseQuerySetup(
  useQuery: (id: 'abc') => TUseQuery,
  args: TUseQuery | object
) {
  const state: TUseQuery = {
    data: [],
    isError: false,
    isPending: false
  }
  const mockedUseQuery = useQuery as unknown as jest.Mock<TUseQuery>
  mockedUseQuery.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

const mockedCreateFinance = createFinance as jest.Mock<Promise<string>>
const mockedCreateFinances = createFinances as jest.Mock<Promise<void>>
const mockedUpdateFinance = updateFinance as jest.Mock<Promise<void>>
const mockedDeleteFinance = deleteFinance as jest.Mock<Promise<void>>

const client = new QueryClient()

function Page() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <Finances />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

function selectPeriod({ year, month }: { year: string; month: string }) {
  const container = within(screen.getByTestId('select-year-month'))

  const monthEl = container.getByText(getMonthExtensive(getMonth(currentDate)))
  fireEvent.mouseDown(monthEl)
  const monthsOptions = within(screen.getByRole('listbox'))
  fireEvent.click(monthsOptions.getByText(month))

  const yearEl = container.getByText(getYear(currentDate))
  fireEvent.mouseDown(yearEl)
  const yearsOptions = within(screen.getByRole('listbox'))
  fireEvent.click(yearsOptions.getByText(year))
}

const original = console.error

describe('<Finances />', () => {
  beforeEach(() => {
    mockedUseAuthContextSetup({})
    mockedUseQuerySetup(useQueryFinances, {
      refetch: jest.fn(),
      data: mockedFinances
    })
    mockedUseQuerySetup(useQueryMembers, { data: mockedMembers })
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = original
  })

  it('should render the heading and page when it does not have authentication', () => {
    mockedUseAuthContextSetup({ user: null })
    mockedUseQuerySetup(useQueryFinances, { data: [] })
    render(<Page />)
    expect(
      screen.getByRole('heading', { name: 'Finanças', level: 1 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Finanças do Mês', level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Adicionar Finanças/i })
    ).not.toBeInTheDocument()
  })

  it('should render the finance list in an orderly manner and correctly wallet', () => {
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    const balance = within(
      screen.getByText('Saldo em caixa').parentElement as HTMLElement
    )
    expect(balance.getByText('R$ 5,00'))
    const incomes = within(
      screen.getByText('Receitas do mês').parentElement as HTMLElement
    )
    expect(incomes.getByText('R$ 20,00'))
    const expenses = within(
      screen.getByText('Despesas do mês').parentElement as HTMLElement
    )
    expect(expenses.getByText('R$ 10,00'))
    const list = within(screen.getByRole('list'))
    const [a, b, c] = list.getAllByRole('listitem')
    expect(a.querySelector('p')?.textContent).toBe('First Income')
    expect(b.querySelector('p')?.textContent).toBe('Second Income')
    expect(c.querySelector('p')?.textContent).toBe('Second Expense')
  })

  it('should render the finance add form', () => {
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar Finanças' }))
    expect(
      screen.getByRole('heading', { name: 'Adicionar Finança', level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { checked: true, name: 'Despesa' })
    ).toBeInTheDocument()
    expect(
      (screen.getByRole('textbox', { name: 'Descrição' }) as HTMLInputElement)
        .value
    ).toBe('')
    expect((screen.getByLabelText('Valor *') as HTMLInputElement).value).toBe(
      '0'
    )
    expect(
      (screen.getByRole('textbox', { name: 'Data' }) as HTMLInputElement).value
    ).toBe(dayjs(currentDate).format('DD/MM/YYYY'))
  })

  it('should render the finance edit form', () => {
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('First Income'))
    expect(
      screen.getByRole('heading', { name: 'Editar Finança', level: 2 })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { checked: true, name: 'Receita' })
    ).toBeInTheDocument()
    expect(
      (screen.getByRole('textbox', { name: 'Descrição' }) as HTMLInputElement)
        .value
    ).toBe('First Income')
    expect((screen.getByLabelText('Valor *') as HTMLInputElement).value).toBe(
      '10'
    )
    expect(
      (screen.getByRole('textbox', { name: 'Data' }) as HTMLInputElement).value
    ).toBe('26/12/2023')
    expect(
      screen.queryByRole('button', { name: 'Referenciar Membros' })
    ).not.toBeInTheDocument()
  })

  it('should create a new income successfully', async () => {
    mockedCreateFinance.mockImplementation(() => Promise.resolve('5'))
    render(<Page />)
    await userEvent.click(
      screen.getByRole('button', { name: 'Adicionar Finanças' })
    )
    await userEvent.click(screen.getByLabelText('Receita'))
    const description = screen.getByLabelText('Descrição *') as HTMLInputElement
    await userEvent.type(description, 'A New Income')
    const date = screen.getByRole('textbox', {
      name: 'Data'
    }) as HTMLInputElement
    await userEvent.type(date, '01/02/2023')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(screen.getByText('Finança criada com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('A New Income')).toBeInTheDocument()
    const list = within(screen.getByRole('list'))
    expect(list.getAllByRole('listitem').length).toBe(1)
  })

  it('should create a new single payment successfully', async () => {
    mockedCreateFinance.mockImplementation(() => Promise.resolve('5'))
    render(<Page />)
    await userEvent.click(
      screen.getByRole('button', { name: 'Adicionar Finanças' })
    )
    await userEvent.click(screen.getByLabelText('Receita'))
    const date = screen.getByRole('textbox', {
      name: 'Data'
    }) as HTMLInputElement
    await userEvent.type(date, '01/02/2023')
    await userEvent.click(
      screen.getByRole('button', { name: 'Referenciar Membros' })
    )
    await userEvent.click(screen.getByText('João'))
    await userEvent.click(screen.getByTestId('close-referenciar-membros'))
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(screen.getByText('Finança criada com sucesso!')).toBeInTheDocument()
    expect(screen.getByText('Pagamento de João')).toBeInTheDocument()
    const list = within(screen.getByRole('list'))
    expect(list.getAllByRole('listitem').length).toBe(1)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should create a new payments successfully', async () => {
    mockedCreateFinances.mockImplementation(() => Promise.resolve())
    render(<Page />)
    await userEvent.click(
      screen.getByRole('button', { name: 'Adicionar Finanças' })
    )
    await userEvent.click(screen.getByLabelText('Receita'))
    const date = screen.getByRole('textbox', {
      name: 'Data'
    }) as HTMLInputElement
    await userEvent.type(date, '01/02/2023')
    await userEvent.click(
      screen.getByRole('button', { name: 'Referenciar Membros' })
    )
    await userEvent.click(screen.getByText('João'))
    await userEvent.click(screen.getByText('Vitor'))
    await userEvent.click(screen.getByTestId('close-referenciar-membros'))
    const description = screen.getByLabelText('Descrição *') as HTMLInputElement
    expect(description.value).toBe('Pagamento de Vitor e um outro membro')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(
      screen.getByText('Finanças criadas com sucesso!')
    ).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when create a finance fails', async () => {
    mockedCreateFinance.mockRejectedValue(new Error())
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar Finanças' }))
    fireEvent.submit(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível criar a finança')
      ).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })

  it('should update a payment successfully', async () => {
    mockedUpdateFinance.mockImplementation(() => Promise.resolve())
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Second Income'))
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Descrição' }),
      'should not change the payment description'
    )
    await userEvent.type(screen.getByLabelText('Valor *'), '27')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(screen.getByText('R$ 27,00')).toBeInTheDocument()
    expect(screen.getByText('Finança editada com sucesso!')).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when update a finance fails', async () => {
    mockedUpdateFinance.mockRejectedValue(new Error())
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('First Income'))
    fireEvent.submit(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível atualizar a finança')
      ).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })

  it('should delete a finance successfully', async () => {
    mockedDeleteFinance.mockImplementation(() => Promise.resolve())
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Second Income'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    expect(screen.getByText('Deseja realmente excluir?'))
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))
    await waitFor(() => {
      expect(
        screen.getByText('Finança excluída com sucesso!')
      ).toBeInTheDocument()
      expect(screen.queryByText('Second Income')).not.toBeInTheDocument()
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
  })

  it('should render an alert message when delete a finance fails', async () => {
    mockedDeleteFinance.mockRejectedValue(new Error())
    render(<Page />)
    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Second Income'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    expect(screen.getByText('Deseja realmente excluir?'))
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível excluir a finança')
      ).toBeInTheDocument()
      expect(screen.getByText('Second Income')).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })

  it('should render an alert message when there is an error getting the finances', async () => {
    mockedUseQuerySetup(useQueryFinances, { data: undefined, isError: true })
    render(<Page />)
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível buscar as finanças')
      ).toBeInTheDocument()
    })
  })

  it('should render an alert message when there is an error getting the members', async () => {
    mockedUseQuerySetup(useQueryMembers, { data: undefined, isError: true })
    render(<Page />)
    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível buscar os membros')
      ).toBeInTheDocument()
    })
  })
})
