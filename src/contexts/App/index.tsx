import { createContext, ReactNode, useContext } from 'react'

import { Loader } from '@/components'

import { TAppContext } from './types'
import { useComponentHandler } from './use-component-handler'

const AppContext = createContext({} as TAppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const props = useComponentHandler()
  return (
    <AppContext.Provider value={props}>
      {children}
      <Loader open={props.isLoading} />
    </AppContext.Provider>
  )
}
