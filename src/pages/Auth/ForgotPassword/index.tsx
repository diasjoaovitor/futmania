import { yupResolver } from '@hookform/resolvers/yup'
import { Button, FormControl, Link as MuiLink, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { AuthLayout, Loader } from '@/components'
import { useButtonTimer } from '@/hooks'

import { schema, TFormData } from './schema'
import { useDataMutation } from './use-data-mutation'

export const ForgotPassword = () => {
  const { disabled, seconds, handleDisabled } = useButtonTimer()

  const { isPending, mutate } = useDataMutation({ handleDisabled })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: TFormData) => {
    mutate(data.email)
  }

  if (isPending) return <Loader />

  return (
    <AuthLayout title="Recuperar senha">
      <FormControl
        component="form"
        role="form"
        noValidate
        fullWidth
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('email')}
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" disabled={disabled}>
          {!disabled
            ? 'Enviar email de recuperação'
            : `Enviar em ${seconds} segundos`}
        </Button>
        <MuiLink
          component={Link}
          to="/signin"
          sx={{ mt: 2, display: 'block' }}
          color="info.light"
        >
          Voltar para o SignIn
        </MuiLink>
      </FormControl>
    </AuthLayout>
  )
}
