import { Login, Logout } from '@mui/icons-material'
import { ListItemButton } from '@mui/material'
import { useAuthContext } from '@/contexts'
import { useComponentHandler } from './use-component-handler'

export const Auth = () => {
  const { user } = useAuthContext()
  const { handleLogin, handleLogout } = useComponentHandler()

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
