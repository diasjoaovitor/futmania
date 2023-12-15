import { useState } from 'react'

const min = 5

export function useLimit(data: any[]) {
  const [limit, setLimit] = useState(min)

  const array = data.slice(0, limit)

  const max = data.length

  const isFull = limit !== min

  const handleLimit = () => {
    setLimit((limit) => (limit === min ? max : min))
  }

  return { array, isFull, handleLimit }
}
