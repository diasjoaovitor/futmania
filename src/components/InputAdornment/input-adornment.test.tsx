import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts'
import { InputAdornment } from '.'

describe('<InputAdornment />', () => {
  it('should render component', async () => {
    const handleChange = jest.fn()
    render(
      <ThemeProvider>
        <InputAdornment
          label="Input Adornment"
          name="name"
          value={2}
          color="error"
          handleChange={handleChange}
        />
      </ThemeProvider>
    )
    const input = screen.getByLabelText('Input Adornment *')
    expect(input).toBeInTheDocument()
    await userEvent.type(input, '5')
    expect(handleChange).toHaveBeenCalled()
  })
})
