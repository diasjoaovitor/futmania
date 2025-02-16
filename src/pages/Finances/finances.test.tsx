import { useMediaQuery } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { Link } from 'react-router'

import {
  AppProvider,
  AuthProvider,
  CallbackProvider,
  DialogProvider,
  NotificationProvider,
  ThemeProvider
} from '@/contexts'
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
  mockedFinance,
  mockedFinances,
  mockedMembers,
  mockedUsers
} from '@/tests'
import { getCurrentDate, getMonth, getMonthExtensive, getYear } from '@/utils'

import { Finances } from '.'

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

const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')
const mockedFindAllBabas = jest.spyOn(BabaService.prototype, 'findAll')
const mockedFindAllFinances = jest.spyOn(FinanceService.prototype, 'findAll')
const mockedFindAllMembers = jest.spyOn(MemberService.prototype, 'findAll')

const mockedCreateFinance = jest.spyOn(FinanceService.prototype, 'create')
const mockedCreateManyFinances = jest.spyOn(
  FinanceService.prototype,
  'createMany'
)
const mockedUpdateFinance = jest.spyOn(FinanceService.prototype, 'update')
const mockedDeleteFinance = jest.spyOn(FinanceService.prototype, 'delete')

const original = console.error

const currentDate = getCurrentDate()
const currentYear = getYear(currentDate)
const currentMonth = getMonthExtensive(getMonth(currentDate))

const selectYearMonth = ({ year, month }: { year: string; month: string }) => {
  const container = within(screen.getByTestId('year-month-select'))
  const monthEl = container.getByText(currentMonth)
  fireEvent.mouseDown(monthEl)
  const monthOptions = within(screen.getByRole('listbox'))
  fireEvent.click(monthOptions.getByText(month))

  const yearEl = container.getByText(currentYear)
  fireEvent.mouseDown(yearEl)
  const yearsOptions = within(screen.getByRole('listbox'))
  fireEvent.click(yearsOptions.getByText(year))
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/finances',
        element: <Finances />
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
        element: <Link to="/finances">Navigate to finances page</Link>
      }
    ],
    {
      initialEntries: ['/finances']
    },
    (props: { children: ReactNode }) => (
      <AuthProvider>
        <AppProvider>{props.children}</AppProvider>
      </AuthProvider>
    )
  )

  return {
    router,
    Component: () => (
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <CallbackProvider>
            <NotificationProvider>
              <DialogProvider>
                <Component />
              </DialogProvider>
            </NotificationProvider>
          </CallbackProvider>
        </ThemeProvider>
      </QueryClientProvider>
    )
  }
}

describe('<Finances />', () => {
  beforeEach(() => {
    user = { emailVerified: true, uid: '1' }
  })

  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
    mockedFindAllBabas.mockResolvedValue(mockedBabas)
    mockedFindAllFinances.mockResolvedValue(mockedFinances)
    mockedFindAllMembers.mockResolvedValue(mockedMembers)
  })

  it('should redirect to the signin page when there is no authentication and show all the following pages in the initial state', async () => {
    user = null
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Explorar Babas' })
      ).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('Baba Test'))
    fireEvent.click(screen.getByText('Navigate to finances page'))
    expect(screen.getByTestId('wallet').textContent).toBe(
      'Saldo em caixaR$ 0,00Receitas do mêsR$ 0,00Despesas do mêsR$ 0,00'
    )
    expect(
      screen.getByText('Não há finanças registradas no mês')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /Adicionar Finanças/i })
    ).not.toBeInTheDocument()
  })

  it('should render financial data correctly', async () => {
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })
    selectYearMonth({ year: '2023', month: 'Dezembro' })
    expect(screen.getByTestId('wallet').textContent).toBe(
      'Saldo em caixaR$ 4,00Receitas do mêsR$ 1,00Despesas do mêsR$ 2,00'
    )
    const list = within(screen.getByRole('list'))
    const [a, b, c] = list.getAllByRole('listitem')
    expect(a.querySelector('p')?.textContent).toBe('Second Expense')
    expect(b.querySelector('p')?.textContent).toBe('First Expense')
    expect(c.querySelector('p')?.textContent).toBe('Pagamento de João')
  })

  it('should create a new income successfully', async () => {
    mockedCreateFinance.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...mockedFinance,
              id: '9',
              type: '+',
              date: currentDate,
              description: 'A New Income'
            })
          }, 100)
        })
    )
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Adicionar Finanças' })
      )
    })
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveClass(
      'MuiButton-colorError'
    )
    fireEvent.click(screen.getByLabelText('Receita'))
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveClass(
      'MuiButton-colorPrimary'
    )
    expect(
      screen.getByRole('button', { name: 'Atribuir pagamentos' })
    ).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Descrição') as HTMLInputElement, {
      target: { value: 'A New Income' }
    })
    fireEvent.change(screen.getByLabelText('Valor') as HTMLInputElement, {
      target: { value: '100' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Finança criada com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.getByText('A New Income')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBe(1)
  })

  it('should create a new single payment successfully', async () => {
    mockedCreateFinance.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...mockedFinance,
              id: '10',
              type: '+',
              date: currentDate,
              description: 'Pagamento de Zidane',
              memberId: '8'
            })
          }, 100)
        })
    )
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Adicionar Finanças' })
      )
    })
    fireEvent.click(screen.getByLabelText('Receita'))
    fireEvent.click(screen.getByRole('button', { name: 'Atribuir pagamentos' }))
    fireEvent.click(screen.getByText('Zidane'))
    fireEvent.click(screen.getByTestId('close-atribuir-pagamentos'))
    fireEvent.change(screen.getByLabelText('Valor') as HTMLInputElement, {
      target: { value: '100' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Finança criada com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.getByText('Pagamento de Zidane')).toBeInTheDocument()
    const list = within(screen.getByRole('list'))
    expect(list.getAllByRole('listitem').length).toBe(1)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should create many payments successfully', async () => {
    mockedCreateManyFinances.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                ...mockedFinance,
                id: '11',
                type: '+',
                date: currentDate,
                description: 'Pagamento de Abel',
                memberId: '4'
              },
              {
                ...mockedFinance,
                id: '12',
                type: '+',
                date: currentDate,
                description: 'Pagamento de Dudu',
                memberId: '6'
              }
            ])
          }, 100)
        })
    )
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Adicionar Finanças' })
      )
    })
    fireEvent.click(screen.getByLabelText('Receita'))
    fireEvent.click(screen.getByRole('button', { name: 'Atribuir pagamentos' }))
    fireEvent.click(screen.getByText('Abel'))
    fireEvent.click(screen.getByText('Dudu'))
    fireEvent.click(screen.getByTestId('close-atribuir-pagamentos'))
    expect((screen.getByLabelText('Descrição') as HTMLInputElement).value).toBe(
      'Pagamento de Dudu e um outro membro'
    )
    fireEvent.change(screen.getByLabelText('Valor') as HTMLInputElement, {
      target: { value: '100' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(
        screen.getByText('Finanças criadas com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.getByText('Pagamento de Abel')).toBeInTheDocument()
    expect(screen.getByText('Pagamento de Dudu')).toBeInTheDocument()
    const list = within(screen.getByRole('list'))
    expect(list.getAllByRole('listitem').length).toBe(2)
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when create a finance fails', async () => {
    console.error = jest.fn()
    mockedCreateFinance.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Adicionar Finanças' })
      )
    })
    fireEvent.change(screen.getByLabelText('Descrição') as HTMLInputElement, {
      target: { value: 'A New Expense' }
    })
    fireEvent.change(screen.getByLabelText('Valor') as HTMLInputElement, {
      target: { value: '100' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(screen.getByText('Erro ao criar finança')).toBeInTheDocument()
    })
    expect(screen.getByRole('form')).toBeInTheDocument()
    console.error = original
  })

  it('should update a payment successfully', async () => {
    mockedUpdateFinance.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...mockedFinance,
            description: 'Pagamento de João',
            date: '2024-01-05',
            id: '5',
            memberId: '1'
          })
        }, 100)
      })
    })
    const { Component } = setup()
    await waitFor(() => {
      render(<Component />)
    })
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })
    selectYearMonth({ year: '2024', month: 'Janeiro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    expect(screen.getByLabelText('Despesa')).toHaveAttribute('disabled')
    expect(screen.getByRole('textbox', { name: 'Descrição' })).toHaveAttribute(
      'disabled'
    )
    const save = screen.getByRole('button', { name: 'Salvar' })
    expect(save).toHaveClass('MuiButton-colorPrimary')
    fireEvent.click(save)
    await waitFor(() => {
      expect(
        screen.getByText('Finança atualizada com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render an alert message when update a finance fails', async () => {
    console.error = jest.fn()
    mockedUpdateFinance.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    await waitFor(() => {
      render(<Component />)
    })
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })
    selectYearMonth({ year: '2024', month: 'Janeiro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    await waitFor(async () => {
      await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    })
    expect(screen.getByText('Erro ao atualizar finança')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    console.error = original
  })

  it('should delete a finance successfully', async () => {
    mockedDeleteFinance.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('5')
        }, 100)
      })
    })
    const { Component } = setup()
    await waitFor(() => {
      render(<Component />)
    })
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })
    selectYearMonth({ year: '2024', month: 'Janeiro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    expect(screen.getByText('Deseja realmente excluir?')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))
    await waitFor(() => {
      expect(
        screen.getByText('Finança excluída com sucesso!')
      ).toBeInTheDocument()
    })
    expect(screen.queryByText('Pagamento de João')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Deseja realmente excluir?')
    ).not.toBeInTheDocument()
  })

  it('should render an alert message when delete a finance fails', async () => {
    console.error = jest.fn()
    mockedDeleteFinance.mockRejectedValue(new Error('error'))
    const { Component } = setup()
    await waitFor(() => {
      render(<Component />)
    })
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Finanças', level: 1 })
      ).toBeInTheDocument()
    })
    selectYearMonth({ year: '2024', month: 'Janeiro' })
    fireEvent.click(screen.getByText('Pagamento de João'))
    fireEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    expect(screen.getByText('Deseja realmente excluir?')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }))
    await waitFor(() => {
      expect(screen.getByText('Erro ao excluir finança')).toBeInTheDocument()
    })
    expect(
      screen.queryByText('Deseja realmente excluir?')
    ).not.toBeInTheDocument()
    expect(screen.getByText('Pagamento de João')).toBeInTheDocument()
    console.error = original
  })

  it('should not render action buttons in another baba', async () => {
    mockedUseMediaQuery.mockReturnValue(true)
    const { Component, router } = setup()
    render(<Component />)
    fireEvent.click(screen.getByText(/Explorar Babas/i))
    expect(router.state.location.pathname).toBe('/explorer')
    await waitFor(() => {
      fireEvent.click(screen.getByText('Other Baba'))
    })
    fireEvent.click(screen.getByText('Navigate to finances page'))
    expect(
      screen.getByRole('heading', { name: 'Finanças', level: 1 })
    ).toBeInTheDocument()
    selectYearMonth({ year: '2024', month: 'Janeiro' })
    expect(
      screen.queryByRole('button', { name: 'Adicionar Finanças' })
    ).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Pagamento de João'))
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })
})
