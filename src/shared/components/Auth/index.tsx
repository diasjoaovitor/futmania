import { Login, Logout } from '@mui/icons-material'
import { ListItemButton } from '@mui/material'
import { useAuthContext } from '@/shared/contexts'
import { useAuth } from './useAuth'

export function Auth() {
  const { user } = useAuthContext()
  const { handleLogin, handleLogout } = useAuth()

  return !user?.uid ? (
    <ListItemButton onClick={handleLogin}>
      <Login />
      Login
    </ListItemButton>
  ) : (
    <ListItemButton onClick={handleLogout}>
      <Logout />
      Logout
    </ListItemButton>
  )
}
