import { fireEvent, render, screen } from '@testing-library/react'
import { TMember } from '@/types'
import { MembersForm } from '.'

describe('<MembersForm />', () => {
  it('should render the heading', () => {
    const handleClose = jest.fn()
    const handleDelete = jest.fn()
    const handleSubmit = jest.fn()
    const handleOpenMemberStats = jest.fn()
    const { rerender } = render(
      <MembersForm
        title="MembersForm"
        isOpened={true}
        member={{} as TMember}
        handleOpenMemberStats={handleOpenMemberStats}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
    )
    expect(
      screen.getByRole('heading', { name: /MembersForm/i })
    ).toBeInTheDocument()
    fireEvent.submit(screen.getByRole('form'))
    expect(handleSubmit).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: /Excluir Membro/i })
    ).not.toBeInTheDocument()

    rerender(
      <MembersForm
        title="MembersForm"
        isOpened={true}
        member={
          {
            id: '1'
          } as TMember
        }
        handleOpenMemberStats={handleOpenMemberStats}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
    )
    expect(
      screen.getByRole('button', { name: /Excluir Membro/i })
    ).toBeInTheDocument()
  })
})
