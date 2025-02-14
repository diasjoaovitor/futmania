import { createContext, ReactNode, useContext } from 'react'

import { Loader } from '@/components'

import { TAppContext } from './types'
import { useComponentHandler } from './use-component-handler'

const AppContext = createContext({} as TAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, ...rest } = useComponentHandler()
  return (
    <AppContext.Provider value={rest}>
      {children}
      <Loader open={isLoading} />
    </AppContext.Provider>
  )
}
