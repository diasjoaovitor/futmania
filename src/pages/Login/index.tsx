import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  Link as MUILink,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { Alert, Loader, Logo } from '@/shared/components'
import { useLogin } from './useLogin'
import { inputs } from './inputs'
import * as S from './style'

export function Login() {
  const { isPending, alertProps, handleSubmit } = useLogin()

  return (
    <Box sx={S.Wrapper}>
      <Logo />
      <Paper sx={S.Form} component="form" role="form" onSubmit={handleSubmit}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <FormControl fullWidth>
          {inputs.map((inputProps) => (
            <TextField key={inputProps.name} {...inputProps} required />
          ))}
        </FormControl>
        <Button type="submit" variant="contained" fullWidth>
          Entrar
        </Button>
      </Paper>
      <MUILink component={Link} to="/">
        Entrar como visitante
      </MUILink>
      <Alert {...alertProps} />
      <Loader open={isPending} />
    </Box>
  )
}
