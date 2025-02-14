import {
  Box,
  Card,
  CardActions,
  CardContent,
  Link as MuiLink,
  Typography
} from '@mui/material'
import { Link } from 'react-router'

import * as S from './styles'

export const NotFound = () => {
  return (
    <Box sx={S.Wrapper}>
      <Card sx={{ p: 4 }}>
        <CardContent>
          <Typography component="h1">Erro 404</Typography>
          <Typography component="p" variant="h5" sx={{ mt: 3 }}>
            Página não encontrada
          </Typography>
        </CardContent>
        <CardActions>
          <MuiLink component={Link} to="/" sx={{ display: 'block', m: 'auto' }}>
            Voltar para a página inicial
          </MuiLink>
        </CardActions>
      </Card>
    </Box>
  )
}
