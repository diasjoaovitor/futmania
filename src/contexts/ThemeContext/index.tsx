import { PropsWithChildren, createContext, useContext } from 'react'
import {
  Theme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline
} from '@mui/material'
import { useComponentHandler } from './use-component-handler'

type TThemeContext = {
  theme: Theme
  toggleTheme(): void
}

const ThemeContext = createContext({} as TThemeContext)

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const provider = useComponentHandler()
  return (
    <ThemeContext.Provider value={provider}>
      <MUIThemeProvider theme={provider.theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
