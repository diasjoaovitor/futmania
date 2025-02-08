import dayjs from 'dayjs'
import { currentDate } from '@/states'
import { getDistinctValues } from '..'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

function capitalize(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

export function getDayNumMonthExtensive(date: string) {
  return dayjs(date).format('D MMMM').split(' ').join(' de ')
}

export function getDayNumMonthExtensiveYearNum(date: string) {
  return dayjs(date).format('D MMMM YYYY').split(' ').join(' de ')
}

export function getMonthExtensive(month: number) {
  return capitalize(dayjs(`2023/${month + 1}`).format('MMMM'))
}

export function getMonthExtensiveYearNum(date: string) {
  return capitalize(dayjs(date).format('MMMM YYYY')).split(' ').join(' de ')
}

export function getStringWeekDayNumberMonthDay(date: string) {
  return capitalize(dayjs(date).format('dddd D').split(' ').join(' dia '))
}

export function getYear(date: string) {
  return dayjs(date).year()
}

export function getMonth(date: string) {
  return dayjs(date).month()
}

export function getYearMonth(date: string) {
  return dayjs(date).format('YYYY/MM')
}

export function getYears(dates: string[]) {
  return getDistinctValues([
    ...dates.map((date) => getYear(date)),
    getYear(currentDate)
  ])
}
