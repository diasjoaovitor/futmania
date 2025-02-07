import { TBabaModel } from '@/models'
import { getDistinctValues, getMonth, getYear } from '@/utils'

export const getDatesInYearMonth = (
  year: number,
  month: number,
  dates: string[]
) => {
  const result = getDistinctValues(
    dates.filter((d) => getYear(d) === year && getMonth(d) === month)
  )
  return result.length > 0 ? (result as string[]) : null
}

export const getBaba = (babas: TBabaModel[], date: string) =>
  babas.find(({ date: d }) => d === date) || null
