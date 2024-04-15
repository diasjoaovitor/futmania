import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import dayjs from 'dayjs'
import { User } from 'firebase/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TFinance, TMember } from '@/shared/types'
import {
  TUseAuthContext,
  useAuth as useAuthContext
} from '@/shared/contexts/AuthContext/useAuth'
import { AuthProvider, ThemeProvider } from '@/shared/contexts'
import {
  createFinance,
  createFinances,
  deleteFinance,
  getFinances,
  getMembers,
  updateFinance
} from '@/shared/firebase'
import { Finances } from '.'
import { getMonth, getMonthExtensive, getYear } from '@/shared/functions'
import { currentDate } from '@/shared/states'
import { mockedFinances, mockedMembers } from '@/shared/tests'
import { AlertProps } from '@/shared/components'

jest.mock('../../shared/contexts/AuthContext/useAuth')
jest.mock('../../shared/firebase')

jest.setTimeout(20000)

const mockedUseAuthContext =
  useAuthContext as unknown as jest.Mock<TUseAuthContext>

function mockedUseAuthContextSetup(args: TUseAuthContext | object) {
  const state: TUseAuthContext = {
    isLoading: false,
    user: { uid: '123' } as User,
    babaUser: {
      id: '123',
      name: 'Baba'
    },
    alertProps: {} as AlertProps
  }
  mockedUseAuthContext.mockImplementation(() => ({
    ...state,
    ...args
  }))
}

const mockedGetFinances = getFinances as jest.Mock<Promise<TFinance[]>>
const mockedGetMembers = getMembers as jest.Mock<Promise<TMember[]>>
const mockedCreateFinance = createFinance as jest.Mock<Promise<string>>
const mockedCreateFinances = createFinances as jest.Mock<Promise<void>>
const mockedUpdateFinance = updateFinance as jest.Mock<Promise<void>>
const mockedDeleteFinance = deleteFinance as jest.Mock<Promise<void>>

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

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
    mockedGetFinances.mockImplementation(() => Promise.resolve([]))
    mockedGetMembers.mockImplementation(() => Promise.resolve([]))
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = original
    client.clear()
  })

  it('should render the heading and page when it does not have authentication', () => {
    mockedUseAuthContextSetup({ user: null })

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

  it('should render the finance list in an orderly manner and correctly wallet', async () => {
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

    selectPeriod({ year: '2023', month: 'Dezembro' })

    const balance = within(
      screen.getByText('Saldo em caixa').parentElement as HTMLElement
    )
    expect(balance.getByText('R$ 2,00'))

    const incomes = within(
      screen.getByText('Receitas do mês').parentElement as HTMLElement
    )
    expect(incomes.getByText('R$ 3,00'))

    const expenses = within(
      screen.getByText('Despesas do mês').parentElement as HTMLElement
    )
    expect(expenses.getByText('R$ 2,00'))

    const list = within(screen.getByRole('list'))
    const [a, b, c, d, e] = list.getAllByRole('listitem')
    expect(a.querySelector('p')?.textContent).toBe('Second Expense')
    expect(b.querySelector('p')?.textContent).toBe('First Income')
    expect(c.querySelector('p')?.textContent).toBe('Pagamento de João')
    expect(d.querySelector('p')?.textContent).toBe('Pagamento de Vitor')
    expect(e.querySelector('p')?.textContent).toBe('First Expense')
  })

  it('should render the finance add form', async () => {
    render(<Page />)

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

  it('should render the finance edit form', async () => {
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

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
      '1'
    )
    expect(
      (screen.getByRole('textbox', { name: 'Data' }) as HTMLInputElement).value
    ).toBe('12/12/2023')
    expect(
      screen.queryByRole('button', { name: 'Referenciar Membros' })
    ).not.toBeInTheDocument()
  })

  it('should create a new income successfully', async () => {
    mockedCreateFinance.mockImplementation(() => Promise.resolve('1'))

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
    mockedGetMembers.mockImplementation(() => Promise.resolve(mockedMembers))
    mockedCreateFinance.mockImplementation(() => Promise.resolve('1'))

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

    await waitFor(() => {
      expect(
        screen.getByText('Finança criada com sucesso!')
      ).toBeInTheDocument()
    })

    expect(screen.getByText('Pagamento de João')).toBeInTheDocument()

    const list = within(screen.getByRole('list'))
    expect(list.getAllByRole('listitem').length).toBe(1)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should create a new payments successfully', async () => {
    mockedGetMembers.mockImplementation(() => Promise.resolve(mockedMembers))
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

    await waitFor(() => {
      expect(
        screen.getByText('Finanças criadas com sucesso!')
      ).toBeInTheDocument()
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
  })

  it('should render an alert message when create a finance fails', async () => {
    mockedCreateFinance.mockRejectedValue(new Error())

    render(<Page />)

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
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))
    mockedUpdateFinance.mockImplementation(() => Promise.resolve())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Pagamento de João'))

    expect(screen.getByRole('textbox', { name: 'Descrição' })).toHaveAttribute(
      'disabled'
    )

    await userEvent.type(screen.getByLabelText('Valor *'), '27')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(screen.getByText('R$ 27,00')).toBeInTheDocument()
    expect(screen.getByText('Finança editada com sucesso!')).toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when update a finance fails', async () => {
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))
    mockedUpdateFinance.mockRejectedValue(new Error())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

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
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))
    mockedDeleteFinance.mockImplementation(() => Promise.resolve())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(screen.getByText('Deseja realmente excluir?'))

    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))

    await waitFor(() => {
      expect(
        screen.getByText('Finança excluída com sucesso!')
      ).toBeInTheDocument()
      expect(screen.queryByText('Pagamento de João')).not.toBeInTheDocument()
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
    })
  })

  it('should render an alert message when delete a finance fails', async () => {
    mockedGetFinances.mockImplementation(() => Promise.resolve(mockedFinances))
    mockedDeleteFinance.mockRejectedValue(new Error())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })

    selectPeriod({ year: '2023', month: 'Dezembro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))

    expect(screen.getByText('Deseja realmente excluir?'))

    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))

    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível excluir a finança')
      ).toBeInTheDocument()
      expect(screen.getByText('Pagamento de João')).toBeInTheDocument()
      expect(screen.getByRole('form')).toBeInTheDocument()
    })
  })

  it('should render an alert message when there is an error getting the finances', async () => {
    mockedGetFinances.mockRejectedValue(new Error())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível buscar as finanças')
      ).toBeInTheDocument()
    })
  })

  it('should render an alert message when there is an error getting the members', async () => {
    mockedGetMembers.mockRejectedValue(new Error())

    render(<Page />)

    await waitFor(() => {
      expect(
        screen.getByText('Não foi possível buscar os membros')
      ).toBeInTheDocument()
    })
  })
})
