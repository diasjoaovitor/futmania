import { render, screen } from '@testing-library/react'

import { TeamsModal } from '.'

describe('<TeamsModal />', () => {
  it('should render the heading', () => {
    const handleSubmit = jest.fn()
    render(
      <TeamsModal
        date="2024-02-19"
        members={[]}
        teams={[]}
        isOpened={true}
        handleClose={jest.fn()}
        handleSubmit={handleSubmit}
      />
    )
    expect(
      screen.getByRole('heading', { name: 'Times', level: 2 })
    ).toBeInTheDocument()
  })
})
