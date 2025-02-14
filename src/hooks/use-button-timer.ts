import { useEffect, useState } from 'react'

export const useButtonTimer = () => {
  const [disabled, setDisabled] = useState(false)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (disabled) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            clearInterval(interval)
            return 60
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [disabled])

  const handleDisabled = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 60000)
  }

  return { disabled, seconds, handleDisabled }
}
