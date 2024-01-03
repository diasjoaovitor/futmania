import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

function capitalize(sentence: string) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

export function getDayNumMonthExtensive(date: string) {
  return dayjs(date).format('D MMMM').split(' ').join(' de ')
}

export function getMonthExtensive(month: number) {
  return capitalize(dayjs(`2023/${month + 1}`).format('MMMM'))
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
