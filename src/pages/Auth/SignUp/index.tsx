import { Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router'

import { Auth } from '@/components'
import { AuthService } from '@/services'

import { inputs } from './inputs'
import { schema } from './schema'

const authService = new AuthService()

export const SignUp = () => {
  return (
    <Auth
      title="Sign Up"
      buttonText="Sign Up"
      schema={schema}
      inputs={inputs}
      errorMessage="Erro ao fazer o Sign Up"
      fn={authService.signUp}
      LinkGroup={() => (
        <Typography>
          Já tem uma conta?{' '}
          <MuiLink component={Link} to="/signin">
            Entrar
          </MuiLink>
        </Typography>
      )}
    />
  )
}
