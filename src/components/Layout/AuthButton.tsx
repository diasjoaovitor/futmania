import { Login, Logout } from '@mui/icons-material'
import { ListItemButton } from '@mui/material'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/contexts'
import { AuthService } from '@/services'

const authService = new AuthService()

export const AuthButton = () => {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/signin')
  }

  const handleSignOut = async () => {
    await authService.signOut()
  }

  return !user?.uid ? (
    <ListItemButton onClick={handleSignIn}>
      <Login />
      Sign In
    </ListItemButton>
  ) : (
    <ListItemButton onClick={handleSignOut}>
      <Logout />
      Sign Out
    </ListItemButton>
  )
}
