import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link as MuiLink,
  Typography
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { Loader } from '@/components'
import { useAuthContext } from '@/contexts'
import { useButtonTimer } from '@/hooks'
import { AuthService } from '@/services'

import * as S from './styles'
import { useDataMutation } from './use-data-mutation'

const authService = new AuthService()

export const EmailVerification = () => {
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const { disabled, seconds, handleDisabled } = useButtonTimer()

  const { isPending, mutate } = useDataMutation({
    handleDisabled
  })

  if (isPending) return <Loader />

  return (
    <Box sx={S.Wrapper}>
      <Card
        sx={{
          maxWidth: 600,
          mb: 3
        }}
      >
        <CardContent>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Verificação de email
          </Typography>
          <Typography component="p" variant="body2">
            Um email de verificação foi enviado para o seu email{' '}
            <strong>{user?.email}</strong>. Por favor, verifique sua caixa de
            entrada.
          </Typography>
          <Typography component="p" variant="body2">
            Caso não encontre o email, verifique sua caixa de spam ou clique no
            botão abaixo para reenviar o email de verificação.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Button
            onClick={() => mutate()}
            variant="contained"
            color="primary"
            disabled={disabled}
          >
            {!disabled
              ? 'Reenviar email de verificação'
              : `Reenviar em ${seconds} segundos`}
          </Button>
          <MuiLink
            component={Link}
            to="/signin"
            onClick={async () => {
              await authService.signOut()
              navigate('/signin')
            }}
            color="info.light"
          >
            Voltar para o SignIn
          </MuiLink>
        </CardActions>
      </Card>
    </Box>
  )
}
