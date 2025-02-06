import { fireEvent, render, screen } from '@testing-library/react'

import { ThemeProvider } from '@/contexts'

import { InputDate } from '.'

describe('<InputDate />', () => {
  it('should render the heading', () => {
    const handleChange = jest.fn()
    render(
      <ThemeProvider>
        <InputDate
          date="2024-01-02"
          color="error"
          handleChange={handleChange}
        />
      </ThemeProvider>
    )
    const input = screen.getByLabelText('Data') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('02/01/2024')
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('gridcell', { name: '30' }))
    expect(handleChange).toHaveBeenCalled()
    expect(input.value).toBe('30/01/2024')
  })
})
