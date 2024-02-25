import dayjs from 'dayjs'

export const createdAt = dayjs().toISOString()

export const months = new Array(12).fill(0).map((_, i) => i)

export const currentDate = dayjs().format('YYYY/MM/DD')

export const seasons = ['0-3', '4-7', '8-11']

export const currentSeason = seasons.find((season) => {
  const [monthFrom] = season.split('-')
  return new Array(4)
    .fill(-1)
    .map(() => Number(monthFrom) + 1)
    .includes(dayjs(currentDate).month())
}) as string
