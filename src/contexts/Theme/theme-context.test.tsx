import { render } from '@testing-library/react'

import { darkTheme, lightTheme } from '@/themes'
import { getLocalStorage } from '@/utils'

import { ThemeProvider } from '.'

jest.mock('@/utils/local-storage')

const mockedGetLocalStorage = getLocalStorage as jest.Mock<'dark' | 'light'>

describe('AuthContext', () => {
  it('should render default theme on first time', () => {
    const { container } = render(<ThemeProvider>app</ThemeProvider>)
    expect(container.parentElement).toHaveStyle(
      `background-color: ${darkTheme.palette.background.default}`
    )
  })

  it('should render default theme saved in local storage', async () => {
    mockedGetLocalStorage.mockReturnValueOnce('light')
    const { container } = render(<ThemeProvider>app</ThemeProvider>)
    expect(container.parentElement).toHaveStyle(
      `background-color: ${lightTheme.palette.background.default}`
    )
  })
})
