import { Login, Logout } from '@mui/icons-material'
import { ListItemButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/contexts'
import { logout } from '@/firebase'

export const AuthButton = () => {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/signin')
  }

  const handleSignOut = async () => {
    await logout()
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
