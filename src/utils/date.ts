import dayjs from 'dayjs'
import { currentDate } from '@/constants'
import { getDistinctValues } from './getters'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

const capitalize = (sentence: string) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1)

export const getDayNumMonthExtensive = (date: string) =>
  dayjs(date).format('D MMMM').split(' ').join(' de ')

export const getDayNumMonthExtensiveYearNum = (date: string) =>
  dayjs(date).format('D MMMM YYYY').split(' ').join(' de ')

export const getMonthExtensive = (month: number) =>
  capitalize(dayjs(`2023/${month + 1}`).format('MMMM'))

export const getMonthExtensiveYearNum = (date: string) =>
  capitalize(dayjs(date).format('MMMM YYYY')).split(' ').join(' de ')

export const getStringWeekDayNumberMonthDay = (date: string) =>
  capitalize(dayjs(date).format('dddd D').split(' ').join(' dia '))

export const getYear = (date: string) => dayjs(date).year()

export const getMonth = (date: string) => dayjs(date).month()

export const getYearMonth = (date: string) => dayjs(date).format('YYYY/MM')

export const getYears = (dates: string[]) =>
  getDistinctValues([
    ...dates.map((date) => getYear(date)),
    getYear(currentDate)
  ])
