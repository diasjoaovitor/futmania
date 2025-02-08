import { getDistinctValues, getMonth, getYear } from '@/utils'

export function getBabaDatesInYearMonth(
  year: number,
  month: number,
  dates: string[]
) {
  return getDistinctValues(
    dates.filter((d) => getYear(d) === year && getMonth(d) === month)
  ) as string[]
}
