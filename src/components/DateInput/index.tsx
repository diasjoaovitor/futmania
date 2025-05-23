import { createTheme, Theme, ThemeProvider } from '@mui/material'
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { forwardRef } from 'react'

const theme = (theme: Theme, color: 'error' | 'primary') =>
  createTheme({
    ...theme,
    components: {
      MuiInputLabel: {
        defaultProps: {
          color
        }
      },
      MuiInputBase: {
        defaultProps: {
          color
        }
      }
    }
  })

export const DateInput = forwardRef(
  (
    props: DatePickerProps & {
      color?: 'error' | 'primary'
      label: string
    },
    ref?: any
  ) => {
    const { label, color, ...rest } = props
    return (
      <ThemeProvider theme={(t: Theme) => theme(t, color || 'primary')}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker label={label} {...rest} ref={ref} />
        </LocalizationProvider>
      </ThemeProvider>
    )
  }
)

DateInput.displayName = 'DateInput'
