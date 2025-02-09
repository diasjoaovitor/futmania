import { FormControl, Theme, ThemeProvider, createTheme } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type TInputDateProps = {
  date: string
  color?: 'error' | 'primary'
  handleChange(e: Dayjs | null): void
}

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

export const InputDate = ({ date, color, handleChange }: TInputDateProps) => {
  return (
    <ThemeProvider theme={(t: Theme) => theme(t, color || 'primary')}>
      <FormControl fullWidth className="InputDate">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Data"
            value={dayjs(date)}
            onChange={handleChange}
          />
        </LocalizationProvider>
      </FormControl>
    </ThemeProvider>
  )
}
