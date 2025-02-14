import { Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router'

import { Auth } from '@/components'
import { AuthService } from '@/services'

import { inputs } from './inputs'
import { schema } from './schema'

const authService = new AuthService()

export const SignIn = () => {
  return (
    <Auth
      title="Sign In"
      buttonText="Sign In"
      schema={schema}
      inputs={inputs}
      errorMessage="Erro ao fazer o Sign In"
      fn={authService.signIn}
      LinkGroup={() => (
        <>
          <Typography>
            Não tem uma conta?{' '}
            <MuiLink component={Link} to="/signup">
              Cadastre-se
            </MuiLink>
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Esqueceu a senha?{' '}
            <MuiLink component={Link} to="/forgot-password">
              Recuperar
            </MuiLink>
          </Typography>
          <MuiLink component={Link} to="/explorer" color="info.light">
            Explorar Babas
          </MuiLink>
        </>
      )}
    />
  )
}
