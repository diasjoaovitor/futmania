import {
  AccountBox,
  Analytics,
  AttachMoney,
  Sports,
  SvgIconComponent
} from '@mui/icons-material'

type TNavItem = {
  label: string
  to: string
  icon: SvgIconComponent
}

export const navItems: TNavItem[] = [
  {
    label: 'Babas',
    to: '/',
    icon: Sports
  },
  {
    label: 'Estatísticas',
    to: '/estatisticas',
    icon: Analytics
  },
  {
    label: 'Membros',
    to: '/membros',
    icon: AccountBox
  },
  {
    label: 'Finanças',
    to: '/financas',
    icon: AttachMoney
  }
]
