import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { getDistinctValues } from './getters'

dayjs.extend(utc)
dayjs.locale('pt-br')

const capitalize = (sentence: string) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1)

export const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD')

export const getTimestamp = () => dayjs().utc().format('YYYY-MM-DDTHH:mm:ss')

export const getCurrentDate = () => dayjs().format('YYYY-MM-DD')

export const getCurrentSeason = (seasons: string[], currentDate: string) =>
  seasons.find((season) => {
    const [monthFrom] = season.split('-')
    const currentSeason = new Array(4)
      .fill(0)
      .map((_, index) => Number(monthFrom) + index)
      .includes(dayjs(currentDate).month())
    return currentSeason
  }) as string

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
  getDistinctValues<number>([
    ...dates.map((date) => getYear(date)),
    getYear(getCurrentDate())
  ])
