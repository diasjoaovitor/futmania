import {
  CssBaseline,
  Theme,
  ThemeProvider as MuiThemeProvider
} from '@mui/material'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState
} from 'react'

import { darkTheme, lightTheme } from '@/themes'
import { getLocalStorage, setLocalStorage } from '@/utils'

type TThemeContext = {
  theme: Theme
  toggleTheme(): void
}

const ThemeContext = createContext({} as TThemeContext)

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

type TThemeMode = 'light' | 'dark'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeName, setThemeName] = useState(
    getLocalStorage<TThemeMode>('futmania_app_theme') || 'dark'
  )

  const theme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme
  }, [themeName])

  const toggleTheme = () => {
    const theme = themeName === 'dark' ? 'light' : 'dark'
    setLocalStorage('futmania_app_theme', theme)
    setThemeName(theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
