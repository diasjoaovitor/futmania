import { render, screen } from '@testing-library/react'
import { AttachMoney } from '@mui/icons-material'
import { WalletCard } from '.'

describe('<WalletCard />', () => {
  it('should render the wallet card correctly', () => {
    const { container } = render(
      <WalletCard caption="Wallet" color="#f00" icon={AttachMoney} value={1} />
    )
    expect(screen.getByText('Wallet')).toBeInTheDocument()
    expect(screen.getByText('R$ 1,00')).toBeInTheDocument()
    expect(screen.getByTestId('AttachMoneyIcon')).toBeInTheDocument()
    expect(container.firstChild).toHaveStyle('border-color: #f00;')
  })
})
