import { fireEvent, render, screen, within } from '@testing-library/react'

import { seasons } from '@/constants'
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
  mockedMembers,
  mockedUsers
} from '@/tests'
import {
  formatMonthExtensive,
  getCurrentDate,
  getCurrentSeason,
  getYear
} from '@/utils'

import { Stats } from '.'

jest.mock('@/services/member')
jest.mock('@/services/baba')
jest.mock('@/services/finance')

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback({
        emailVerified: true,
        uid: '1'
      })
    })
  }))
}))

const mockedFindAllMembers = jest.spyOn(MemberService.prototype, 'findAll')
const mockedFindAllBabas = jest.spyOn(BabaService.prototype, 'findAll')
const mockedFindAllFinances = jest.spyOn(FinanceService.prototype, 'findAll')
const mockedFindAllUsers = jest.spyOn(UserService.prototype, 'findAll')

const currentDate = getCurrentDate()
const [monthFrom, monthTo] = getCurrentSeason(seasons, currentDate).split('-')
const currentSeason = `${formatMonthExtensive(Number(monthFrom))} - ${formatMonthExtensive(Number(monthTo))}`
const currentYear = getYear(currentDate)

const selectSeason = ({ year, season }: { year: string; season: string }) => {
  const container = within(screen.getByTestId('season-select'))

  const seasonEl = container.getByText(currentSeason)
  fireEvent.mouseDown(seasonEl)
  const seasonOptions = within(screen.getByRole('listbox'))
  fireEvent.click(seasonOptions.getByText(season))

  const yearEl = container.getByText(currentYear)
  fireEvent.mouseDown(yearEl)
  const yearsOptions = within(screen.getByRole('listbox'))
  fireEvent.click(yearsOptions.getByText(year))
}

const setup = () =>
  memoryRouter(
    [
      {
        path: '/stats',
        element: <Stats />
      }
    ],
    {
      initialEntries: ['/stats']
    }
  )

describe('<Stats />', () => {
  beforeAll(() => {
    mockedFindAllBabas.mockResolvedValue(mockedBabas)
    mockedFindAllMembers.mockResolvedValue(mockedMembers)
    mockedFindAllFinances.mockResolvedValue(mockedFinances)
    mockedFindAllUsers.mockResolvedValue(mockedUsers)
  })

  it('should render the page when there are no babas', async () => {
    const { Component } = setup()
    render(<Component />)
    expect(
      screen.getByRole('heading', { name: 'Estatísticas', level: 1 })
    ).toBeInTheDocument()
    expect(screen.getByText('Não há babas nessa temporada')).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Ranking', level: 2 })
    ).not.toBeInTheDocument()
  })

  it('should render season stats correctly', async () => {
    const { Component } = setup()
    render(<Component />)
    selectSeason({ year: '2024', season: 'Janeiro - Abril' })
    const ranking = within(
      screen.getByRole('heading', { name: 'Ranking', level: 2 })
        .nextElementSibling as HTMLElement
    )
    const rankingValues = ranking
      .getAllByRole('row')
      .map((row) => row.textContent)
    expect(rankingValues[1]).toBe('1Endrick222') // position 1 | name Endrick | score 22 | babas 2
    expect(rankingValues[5]).toBe('5Abel122') // position 5 | name Abel | score 12 | babas 2
    const topScorers = within(
      screen.getByRole('heading', { name: 'Artilharia', level: 2 })
        .nextElementSibling as HTMLElement
    )
    const topScorersValues = topScorers
      .getAllByRole('row')
      .map((row) => row.textContent)
    expect(topScorersValues[1]).toBe('1Endrick422.00') // position 1 | name Endrick | goals 4 | babas 2 | average 2.00
    expect(topScorersValues[5]).toBe('5Vitor020.00') // position 5 | name Abel | goals 0 | babas 2 | average 0.00
  })

  it('should render all member stats', () => {
    const { Component } = setup()
    render(<Component />)
    selectSeason({ year: '2024', season: 'Janeiro - Abril' })
    const ranking = within(
      screen.getByRole('heading', { name: 'Ranking', level: 2 })
        .nextElementSibling as HTMLElement
    )
    fireEvent.click(ranking.getByText('Endrick'))
    expect(screen.getByTestId('member-stats-modal').textContent).toBe(
      'EndrickEstatísticasBabas3Capas3Pontos27Gols6FrequênciaMensalidadePagamento pendente!'
    )
  })
})
