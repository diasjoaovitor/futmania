import { Login, Logout } from '@mui/icons-material'
import { ListItemButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/contexts'
import { AuthService } from '@/services'

const authService = new AuthService()

export const AuthButton = () => {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/signin')
  }

  const handleLogout = async () => {
    await authService.signOut()
  }

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
