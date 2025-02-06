import { getDistinctValues, getMonth, getYear } from '@/utils'

export const getDatesInYearMonth = (
  year: number,
  month: number,
  dates: string[]
) =>
  getDistinctValues(
    dates.filter((d) => getYear(d) === year && getMonth(d) === month)
  ) as string[]
