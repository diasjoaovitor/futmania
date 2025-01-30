import { createContext, useContext, useState } from 'react'

type TCallbackContext = {
  handleSuccessCallbacks: () => void
  setSuccessCallbacks: (callbacks: (() => void)[]) => void
  handleErrorCallbacks: () => void
  setErrorCallbacks: (callbacks: (() => void)[]) => void
}

const CallbackContext = createContext({} as TCallbackContext)

export const useCallbackContext = () => useContext(CallbackContext)

export const CallbackProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [successCallbacks, setSuccessCallbacks] = useState<(() => void)[]>([])
  const [errorCallbacks, setErrorCallbacks] = useState<(() => void)[]>([])

  const handleSuccessCallbacks = () => {
    successCallbacks.forEach((callback) => callback())
    setSuccessCallbacks([])
  }

  const handleErrorCallbacks = () => {
    errorCallbacks.forEach((callback) => callback())
    setErrorCallbacks([])
  }

  return (
    <CallbackContext.Provider
      value={{
        handleErrorCallbacks,
        handleSuccessCallbacks,
        setErrorCallbacks,
        setSuccessCallbacks
      }}
    >
      {children}
    </CallbackContext.Provider>
  )
}
