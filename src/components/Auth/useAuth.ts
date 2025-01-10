import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/services'

const authService = new AuthService()

export function useAuth() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/entrar')
  }

  const handleLogout = async () => {
    await authService.signOut()
  }

  return { handleLogin, handleLogout }
}
