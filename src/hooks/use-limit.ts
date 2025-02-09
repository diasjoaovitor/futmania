import { useState } from 'react'

export const useLimit = (data: any[], min: number) => {
  const [limit, setLimit] = useState(min)

  const limited = data.slice(0, limit)

  const max = data.length

  const isFull = limit !== min

  const handleLimit = () => {
    setLimit((limit) => (limit === min ? max : min))
  }

  return { limited, isFull, handleLimit }
}
