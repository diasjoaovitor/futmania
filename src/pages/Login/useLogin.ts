import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'firebase/auth'
import { AlertProps } from '@/shared/components'
import { getErrorMessage } from '@/shared/errors'
import { getElementValues } from '@/shared/functions'
import { login } from '@/shared/firebase'
import { useAlert } from '@/shared/hooks'

export function useLogin() {
  const navigate = useNavigate()

  const { alert, setAlert, alertIsOpened, handleCloseAlert } = useAlert()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => navigate('/'),
    onError: (error: AuthError) => {
      setAlert({
        severity: 'error',
        title: getErrorMessage(error.code)
      })
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [email, password] = getElementValues(e, ['email', 'password'])
    if (!email || !password) {
      setAlert({
        severity: 'error',
        title: 'Todos os campos devem ser preenchidos!'
      })
      return
    }
    mutate({ email, password })
  }

  const alertProps: AlertProps = {
    ...alert,
    isOpened: alertIsOpened,
    handleClose: handleCloseAlert
  }

  return { isPending, alertProps, handleSubmit }
}
