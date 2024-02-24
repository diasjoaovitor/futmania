import { fireEvent, render, screen, within } from '@testing-library/react'
import { TFrequency } from '@/shared/functions'
import { MemberFrequency } from '.'

const mockedFrequency: TFrequency[] = [
  {
    date: '2024-02-14',
    showedUp: false
  },
  {
    date: '2024-02-04',
    showedUp: true
  },
  {
    date: '2024-01-28',
    showedUp: true
  },
  {
    date: '2024-01-21',
    showedUp: false
  },
  {
    date: '2024-01-14',
    showedUp: true
  },
  {
    date: '2024-01-07',
    showedUp: false
  }
]

describe('<MemberFrequency />', () => {
  it('should render frequency icons correctly', () => {
    const { rerender } = render(<MemberFrequency frequency={[]} />)
    expect(screen.getByText('Frequência'))
    expect(screen.queryAllByTestId('CheckIcon').length).toBe(0)
    expect(screen.getAllByTestId('CloseIcon').length).toBe(1)

    rerender(<MemberFrequency frequency={mockedFrequency} />)
    expect(screen.getAllByTestId('CheckIcon').length).toBe(3)
    expect(screen.getAllByTestId('CloseIcon').length).toBe(2)
  })

  it('should render ordered frequency icons', () => {
    render(<MemberFrequency frequency={mockedFrequency} />)
    const items = screen.getAllByTestId('frequency-item')
    expect(items.length).toBe(5)
    const [a, b, c, d, e] = items
    expect(within(a).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(b).getByTestId('CloseIcon')).toBeInTheDocument()
    expect(within(c).getByTestId('CheckIcon')).toBeInTheDocument()
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

    const [a, b, c, d, e, f] = items
    expect(within(a).getByTestId('CloseIcon')).toBeInTheDocument()
    expect(within(b).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(c).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(d).getByTestId('CloseIcon')).toBeInTheDocument()
    expect(within(e).getByTestId('CheckIcon')).toBeInTheDocument()
    expect(within(f).getByTestId('CloseIcon')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Ver menos'))
    expect(screen.getAllByTestId('frequency-item').length).toBe(5)
  })
})
