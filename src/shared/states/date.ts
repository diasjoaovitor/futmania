import dayjs from 'dayjs'

export const createdAt = dayjs().toISOString()

export const months = new Array(12).fill(0).map((_, i) => i)

export const currentDate = dayjs().format('YYYY/MM/DD')

export const seasons = ['0-3', '4-7', '8-11']

export const currentSeason = seasons.find((season) => {
  const [monthFrom] = season.split('-')
  const currentSeason = new Array(4)
    .fill(0)
    .map((_, index) => Number(monthFrom) + index)
    .includes(dayjs(currentDate).month())
  return currentSeason
}) as string
