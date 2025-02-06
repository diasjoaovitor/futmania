import { fireEvent, render, screen, within } from '@testing-library/react'

import { mockedFrequency } from '@/tests'

import { MemberFrequency } from './Frequency'

describe('<MemberFrequency />', () => {
  it('should render empty frequency correctly', () => {
    render(<MemberFrequency frequency={[]} />)
    expect(screen.getByText('Frequência'))
    expect(screen.queryAllByTestId('CheckIcon').length).toBe(0)
    expect(screen.getAllByTestId('CloseIcon').length).toBe(1)
  })

  it('should render ordered frequency icons', () => {
    render(<MemberFrequency frequency={mockedFrequency} />)

    const items = screen.getAllByTestId('frequency-item')
    expect(items.length).toBe(5)

    const [a, b, c, d, e] = items
    expect(within(a).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(b).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(c).getByTestId('CloseIcon')).toBeInTheDocument()
    expect(within(d).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(e).getByTestId('CloseIcon')).toBeInTheDocument()
  })

  it('should render expanded list after click', () => {
    render(<MemberFrequency frequency={mockedFrequency} />)

    const compactItems = screen.getAllByTestId('frequency-item')
    expect(compactItems.length).toBe(5)

    const [button] = compactItems
    fireEvent.click(button)
    const items = screen.getAllByTestId('frequency-item')
    expect(items.length).toBe(6)

    const f = items[5]
    expect(within(f).getByTestId('CloseIcon')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Ver menos'))
    expect(screen.getAllByTestId('frequency-item').length).toBe(5)
  })
})
