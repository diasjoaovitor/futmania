import { useNavigate } from 'react-router-dom'
import { logout } from '@/firebase'

export function useComponentHandler() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/entrar')
  }

  const handleLogout = async () => {
    await logout()
  }

  return { handleLogin, handleLogout }
}
