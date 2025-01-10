import { Link } from 'react-router-dom'
import { Box, Link as MuiLink, Paper, Typography } from '@mui/material'
import { Loader, Logo } from '@/components'
import { Form } from './Form'
import { useComponentHandler } from './use-component-handler'
import * as S from './styles'

export const SignIn = () => {
  const { isPending, handleSubmit } = useComponentHandler()

  return (
    <Box sx={S.Wrapper}>
      <Logo />
      <Paper sx={S.Paper}>
        <Typography component="h1" variant="h5">
          SignIn
        </Typography>
        <Form handleSubmit={handleSubmit} />
        <MuiLink component={Link} to="/">
          Entrar como visitante
        </MuiLink>
      </Paper>
      <Loader open={isPending} />
    </Box>
  )
}
