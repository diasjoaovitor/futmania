import { fireEvent, render, screen, within } from '@testing-library/react'

import { TBabaModel } from '@/models'
import {
  mockedBaba,
  mockedBabas,
  mockedFinances,
  mockedFrequency,
  mockedMember,
  mockedMembers
} from '@/tests'
import { TMember } from '@/types'
import { getMemberStats } from '@/utils'

import { MemberStatsModal, TMemberStatsModalProps } from '.'

const babas: TBabaModel[] = mockedFrequency.map(({ date, showedUp }) => ({
  ...mockedBaba,
  date,
  teams: [
    {
      draws: 0,
      members: [{ goals: 0, memberId: showedUp ? '1' : '2' }],
      name: 'Team',
      wins: 0
    }
  ]
}))

const Component = (
  props: Partial<TMemberStatsModalProps> & {
    member: TMember
    babas?: TBabaModel[]
  }
) => {
  const stats = getMemberStats(props.babas ?? mockedBabas, props.member.id)
  return (
    <MemberStatsModal
      finances={props.finances ?? mockedFinances}
      handleClose={jest.fn()}
      isOpened={true}
      member={props.member}
      stats={stats}
    />
  )
}

describe('<MemberStatsModal />', () => {
  describe('<Stats />', () => {
    it('should render member stats correctly', () => {
      render(<Component member={mockedMember} />)
      expect(
        screen.getByRole('heading', { name: 'João', level: 2 })
      ).toBeInTheDocument()
      const wrapper = screen.getByText('Estatísticas')
        .parentElement as HTMLElement
      // Babas: 3 | Capas: 0 | Pontos: 24 | Gols: 6
      expect(wrapper.textContent).toBe('EstatísticasBabas3Capas0Pontos24Gols6')
    })
  })

  describe('<Frequency />', () => {
    it('should render empty frequency correctly', () => {
      render(<Component member={mockedMembers[7]} />)
      expect(
        screen.getByRole('heading', { name: 'Zidane', level: 2 })
      ).toBeInTheDocument()
      const wrapper = within(
        screen.getByText('Frequência').parentElement as HTMLElement
      )
      expect(wrapper.queryAllByTestId('CheckIcon')).toHaveLength(0)
      expect(wrapper.getAllByTestId('CloseIcon')).toHaveLength(1)
    })

    it('should render ordered frequency icons', () => {
      render(<Component member={mockedMember} babas={babas} />)

      const items = screen.getAllByTestId('frequency-item')
      expect(items).toHaveLength(5)

      const [a, b, c, d, e] = items
      expect(within(a).getByTestId('CheckIcon')).toBeInTheDocument()
      expect(within(b).getByTestId('CloseIcon')).toBeInTheDocument()
      expect(within(c).getByTestId('CheckIcon')).toBeInTheDocument()
      expect(within(d).getByTestId('CloseIcon')).toBeInTheDocument()
      expect(within(e).getByTestId('CloseIcon')).toBeInTheDocument()
    })

    it('should render expanded list after click', () => {
      render(<Component member={mockedMember} babas={babas} />)

      const compactItems = screen.getAllByTestId('frequency-item')
      expect(compactItems).toHaveLength(5)

      const [button] = compactItems
      fireEvent.click(button)
      const items = screen.getAllByTestId('frequency-item')
      expect(items).toHaveLength(6)

      const frequency = items[5]
      expect(within(frequency).getByTestId('CheckIcon')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Ver menos'))
      expect(screen.getAllByTestId('frequency-item')).toHaveLength(5)
    })
  })

  describe('<Payments />', () => {
    it("should render the member's payment status", () => {
      const { rerender } = render(
        <Component member={mockedMember} babas={babas} />
      )
      const wrapper = within(
        screen.getByText('Mensalidade').parentElement as HTMLElement
      )
      expect(wrapper.getByText('Pagamento em dia!')).toBeInTheDocument()
      expect(wrapper.getByTestId('CheckIcon')).toBeInTheDocument()

      rerender(
        <Component
          member={mockedMember}
          babas={babas.map((baba) => ({
            ...baba,
            teams: baba.teams.map((team) => ({
              ...team,
              members: team.members.map(() => ({
                memberId: '1',
                goals: 0
              }))
            }))
          }))}
        />
      )
      expect(wrapper.getByText('Pagamento pendente!')).toBeInTheDocument()
      expect(wrapper.getByTestId('CloseIcon')).toBeInTheDocument()
    })

    it('should render all member payments', () => {
      render(<Component member={mockedMember} babas={babas} />)

      fireEvent.click(screen.getByText('Pagamento em dia!'))

      const payments = screen.getAllByTestId('payment-item')
      expect(payments).toHaveLength(6)

      const [a, b, c, d, e, f] = payments

      expect(within(a).getByText('Maio de 2024')).toBeInTheDocument()
      expect(within(a).getByText('Babas: 0')).toBeInTheDocument()
      expect(within(a).getByText('Pagamento: Isento')).toBeInTheDocument()

      expect(within(b).getByText('Abril de 2024')).toBeInTheDocument()
      expect(within(b).getByText('Babas: 0')).toBeInTheDocument()
      expect(within(b).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()

      expect(within(c).getByText('Fevereiro de 2024')).toBeInTheDocument()
      expect(within(c).getByText('Babas: 0')).toBeInTheDocument()
      expect(within(c).getByText('Pagamento: Isento')).toBeInTheDocument()

      expect(within(d).getByText('Janeiro de 2024')).toBeInTheDocument()
      expect(within(d).getByText('Babas: 2')).toBeInTheDocument()
      expect(within(d).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()

      expect(within(e).getByText('Dezembro de 2023')).toBeInTheDocument()
      expect(within(e).getByText('Babas: 1')).toBeInTheDocument()
      expect(within(e).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()

      expect(within(f).getByText('Novembro de 2023')).toBeInTheDocument()
      expect(within(f).getByText('Babas: 0')).toBeInTheDocument()
      expect(within(f).getByText('Pagamento: R$ 1,00')).toBeInTheDocument()
    })
  })
})
