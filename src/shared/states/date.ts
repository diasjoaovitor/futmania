import dayjs from 'dayjs'

export const createdAt = dayjs().toISOString()

export const months = new Array(12).fill(0).map((_, i) => i)

export const currentDate = dayjs().format('YYYY/MM/DD')
