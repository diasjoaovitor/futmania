import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts'
import { TFinance } from '@/types'
import { palette } from '@/themes'
import { mockedFinance } from '@/tests'
import { FinancesForm } from '.'

function Component({
  finance,
  handleChange,
  handleDelete,
  handleSubmit
}: {
  finance: TFinance
  handleChange(): void
  handleDelete(): void
  handleSubmit(): void
}) {
  return (
    <ThemeProvider>
      <FinancesForm
        isOpened={true}
        title="Finances Form"
        members={[]}
        checkedMembers={[]}
        finance={finance}
        finances={[]}
        handleChange={handleChange}
        handleCheckedMembersChange={jest.fn()}
        handleClose={jest.fn()}
        handleDateChange={jest.fn()}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
    </ThemeProvider>
  )
}

describe('<FinancesForm />', () => {
  it('must meet the conditions when there is no id for expense finance', async () => {
    const handleChange = jest.fn()
    const handleSubmit = jest.fn()
    render(
      <Component
        finance={{ ...mockedFinance, id: undefined, type: '-' }}
        handleChange={handleChange}
        handleDelete={jest.fn()}
        handleSubmit={handleSubmit}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Finances Form' })
    ).toBeInTheDocument()
    const description = screen.getByRole('textbox', { name: 'Descrição' })
    expect(description).not.toHaveAttribute('disabled')
    expect(screen.getByRole('radio', { name: 'Despesa' })).not.toHaveAttribute(
      'disabled'
    )
    expect(
      screen.queryByRole('button', { name: 'Referenciar Membros' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Excluir' })
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveStyle(
      `background-color: ${palette.darkRed}`
    )
    await userEvent.type(description, 'abc')
    expect(handleChange).toHaveBeenCalled()
    fireEvent.submit(screen.getByRole('form'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('must meet the conditions when there is no id for expense finance', async () => {
    const handleChange = jest.fn()
    const handleDelete = jest.fn()
    render(
      <Component
        finance={{ ...mockedFinance, id: undefined }}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSubmit={jest.fn()}
      />
    )
    const description = screen.getByRole('textbox', { name: 'Descrição' })
    expect(description).not.toHaveAttribute('disabled')
    expect(screen.getByRole('radio', { name: 'Despesa' })).not.toHaveAttribute(
      'disabled'
    )
    expect(
      screen.getByRole('button', { name: 'Referenciar Membros' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveStyle(
      `background-color: ${palette.darkBlue}`
    )
  })

  it('must meet the conditions for income finance', async () => {
    const handleChange = jest.fn()
    const handleDelete = jest.fn()
    render(
      <Component
        finance={{ ...mockedFinance, id: '1', type: '+' }}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSubmit={jest.fn()}
      />
    )
    expect(
      screen.queryByRole('button', { name: 'Referenciar Membros' })
    ).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Excluir' }))
    expect(handleDelete).toHaveBeenCalled()
  })

  it('must meet the conditions for payment finance', async () => {
    const handleChange = jest.fn()
    const handleDelete = jest.fn()
    render(
      <Component
        finance={{ ...mockedFinance, id: '1', memberId: '1', type: '+' }}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSubmit={jest.fn()}
      />
    )
    const description = screen.getByRole('textbox', { name: 'Descrição' })
    expect(description).toHaveAttribute('disabled')
    expect(screen.getByRole('radio', { name: 'Despesa' })).toHaveAttribute(
      'disabled'
    )
    expect(
      screen.queryByRole('button', { name: 'Referenciar Membros' })
    ).not.toBeInTheDocument()
    await userEvent.type(description, 'abc')
    expect(handleChange).not.toHaveBeenCalled()
  })
})
