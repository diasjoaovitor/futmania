import {
  CssBaseline,
  Theme,
  ThemeProvider as MuiThemeProvider} from '@mui/material'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { darkTheme, lightTheme } from '@/themes'

type TThemeContext = {
  theme: Theme
  toggleTheme(): void
}

const ThemeContext = createContext({} as TThemeContext)

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark')

  const theme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme
  }, [themeName])

  const toggleTheme = useCallback(() => {
    setThemeName((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
