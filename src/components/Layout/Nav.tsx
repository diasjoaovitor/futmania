import { GitHub, Settings } from '@mui/icons-material'
import { Box, Divider, Link as MUILink, ListItemButton } from '@mui/material'
import { Link, useLocation } from 'react-router'

import { useAuthContext } from '@/contexts'

import { AuthButton } from './AuthButton'
import { navItems } from './nav-items'
import * as S from './styles'
import { ToggleTheme } from './ToggleTheme'

export const Nav = () => {
  const { user } = useAuthContext()
  const { pathname } = useLocation()

  return (
    <Box sx={S.NavWrapper} component="nav">
      <div>
        {navItems.map(({ label, to, icon: Icon }) => (
          <Link key={to} to={to}>
            <ListItemButton selected={to === pathname}>
              <Icon />
              {label}
            </ListItemButton>
          </Link>
        ))}
      </div>
      <div>
        <Divider />
        <ToggleTheme />
        <Divider />
        <AuthButton />
        <Divider />
        {user && (
          <Link to="/settings">
            <ListItemButton selected={'/settings' === pathname}>
              <Settings />
              Configurações
            </ListItemButton>
          </Link>
        )}
        <Divider />
        <MUILink href="https://github.com/diasjoaovitor" target="_blank">
          <ListItemButton>
            <GitHub />
            Criado por João Vitor
          </ListItemButton>
        </MUILink>
      </div>
    </Box>
  )
}
