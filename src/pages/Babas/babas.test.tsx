import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
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
  mockedBaba,
  mockedBabas,
  mockedFinances,
  mockedMembers,
  mockedUsers
} from '@/tests'
import {
  getCurrentDate,
  getMonth,
  getMonthExtensive,
  getStringWeekDayNumberMonthDay,
  getYear,
  sortByDate
} from '@/utils'

import { Babas } from '.'

const user: {
  emailVerified: boolean
  uid: string
} | null = { emailVerified: true, uid: '1' }

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback(user)
    })
  }))
}))

const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')
const mockedFindAllBabas = jest.spyOn(BabaService.prototype, 'findAll')
const mockedFindAllFinances = jest.spyOn(FinanceService.prototype, 'findAll')
const mockedFindAllMembers = jest.spyOn(MemberService.prototype, 'findAll')

const mockedCreateBaba = jest.spyOn(BabaService.prototype, 'create')

const lastBabaDate = sortByDate(mockedBabas).at(-1)!.date
const lastBabaYear = getYear(lastBabaDate)
const lastBabaMonth = getMonthExtensive(getMonth(lastBabaDate))
const lastBabaDay = getStringWeekDayNumberMonthDay(lastBabaDate)

const selectYearMonthDay = ({
  year,
  month,
  day
}: {
  year?: string | number
  month?: string
  day?: string
}) => {
  const container = within(screen.getByTestId('year-month-day-select'))

  if (month) {
    const monthEl = container.getByText(lastBabaMonth)
    fireEvent.mouseDown(monthEl)
    const monthOptions = within(screen.getByRole('listbox'))
    fireEvent.click(monthOptions.getByText(month))
  }

  if (year) {
    const yearEl = container.getByText(lastBabaYear)
    fireEvent.mouseDown(yearEl)
    const yearsOptions = within(screen.getByRole('listbox'))
    fireEvent.click(yearsOptions.getByText(year))
  }

  if (day) {
    const dayEl = container.getByText(lastBabaDay)
    fireEvent.mouseDown(dayEl)
    const dayOptions = within(screen.getByRole('listbox'))
    fireEvent.click(dayOptions.getByText(day))
  }
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
        path: '/',
        element: <Babas />
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
        element: <Link to="/">Navigate to babas page</Link>
      }
    ],
    {
      initialEntries: ['/']
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

describe('<Babas />', () => {
  beforeAll(() => {
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
    mockedFindAllBabas.mockResolvedValue(mockedBabas)
    mockedFindAllFinances.mockResolvedValue(mockedFinances)
    mockedFindAllMembers.mockResolvedValue(mockedMembers)
  })

  it('should render the last baba', async () => {
    const { Component } = setup()
    render(<Component />)
    await waitFor(() => {
      expect(screen.queryByTestId('loader-true')).not.toBeInTheDocument()
    })
    await waitFor(() => {
      expect(screen.getByTestId('year-month-day-select')).toHaveTextContent(
        'Quinta-feira dia 4​Abril​2024'
      )
    })
    expect(
      screen.getByRole('button', { name: 'Novo Baba' })
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Editar Baba' })
      ).toBeInTheDocument()
    })
    expect(
      screen.getByRole('button', { name: 'Excluir Baba' })
    ).toBeInTheDocument()
    selectYearMonthDay({
      year: getYear(getCurrentDate())
    })
    expect(
      screen.getByText('Não existe nenhum Baba nesta data')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Novo Baba' })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Editar Baba' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Excluir Baba' })
    ).not.toBeInTheDocument()
  })

  it('should successfully create a new Baba', async () => {
    mockedCreateBaba.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ...mockedBaba,
              id: '10',
              date: getCurrentDate()
            })
          }, 100)
        })
    )
    const { Component } = setup()
    render(<Component />)
    fireEvent.click(screen.getByRole('button', { name: 'Novo Baba' }))
    const checkboxes = screen.getAllByRole('checkbox')
    const members = checkboxes.slice(1, checkboxes.length) as HTMLElement[]
    expect(members).toHaveLength(mockedMembers.length)
    members.forEach((member) => {
      fireEvent.click(member)
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sortear' }))
    expect(
      screen.getByRole('heading', { name: 'Times', level: 2 })
    ).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    await waitFor(() => {
      expect(screen.getByText('Baba criado com sucesso!')).toBeInTheDocument()
    })
    const currentDate = getCurrentDate()
    const selectWrapper = within(screen.getByTestId('year-month-day-select'))
    expect(
      selectWrapper.getByText(getStringWeekDayNumberMonthDay(currentDate))
    ).toBeInTheDocument()
    expect(
      selectWrapper.getByText(getMonthExtensive(getMonth(currentDate)))
    ).toBeInTheDocument()
    expect(selectWrapper.getByText(getYear(currentDate))).toBeInTheDocument()

    const [cols, firstTeamRow, , secondTeamRow, , thirdTeamRow] =
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

    const membersRow = secondTeamRow.nextElementSibling as HTMLElement
    expect(within(membersRow).queryAllByRole('columnheader').length).toBe(0)

    fireEvent.click(within(secondTeamRow).getByTestId('ExpandMoreIcon'))

    const [col1, col2] = within(membersRow).getAllByRole('columnheader')
    expect(col1.textContent).toBe('Nome')
    expect(col2.textContent).toBe('Gols')

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
