import { Sports, SvgIconComponent } from '@mui/icons-material'

type NavItem = {
  label: string
  to: string
  icon: SvgIconComponent
}

export const navItems: NavItem[] = [
  {
    label: 'Babas',
    to: '/',
    icon: Sports
  }
]
