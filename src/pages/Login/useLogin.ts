import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AuthError } from 'firebase/auth'
import { getErrorMessage } from '@/shared/errors'
import { getElementValues } from '@/shared/functions'
import { login } from '@/shared/firebase'

export function useLogin() {
  const navigate = useNavigate()

  const [error, setError] = useState<string>('')

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => navigate('/'),
    onError: (error: AuthError) => setError(getErrorMessage(error.code))
  })

  const handleClose = () => setError('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [email, password, passwordConfirmation] = getElementValues(e, [
      'email',
      'password',
      'passwordConfirmation'
    ])
    if (passwordConfirmation && password !== passwordConfirmation) {
      setError('As senhas digitadas não são iguais!')
      return
    }
    mutate({ email, password })
  }

  return { isPending, error, handleClose, handleSubmit }
}
