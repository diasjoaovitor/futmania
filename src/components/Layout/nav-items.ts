import {
  AccountBox,
  Analytics,
  AttachMoney,
  DeviceHub,
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
    to: '/stats',
    icon: Analytics
  },
  {
    label: 'Membros',
    to: '/members',
    icon: AccountBox
  },
  {
    label: 'Finanças',
    to: '/finances',
    icon: AttachMoney
  },
  {
    label: 'Explorar Babas',
    to: '/explorer',
    icon: DeviceHub
  }
]
