import { Link as MuiLink, Typography } from '@mui/material'
import { Link } from 'react-router'

import { AuthLayout, Layout } from '@/components'
import { useAppContext } from '@/contexts'

import { List } from './List'

export const Explorer = () => {
  const { users, isLoading } = useAppContext()

  if (isLoading) return null

  if (users.length === 0)
    return (
      <AuthLayout title="Explorar Babas">
        <Typography component="p">
          Ainda não há existe nenhum Baba criado
        </Typography>
        <MuiLink component={Link} to="/signin" sx={{ mt: 2, display: 'block' }}>
          Ir para o Sign In
        </MuiLink>
      </AuthLayout>
    )

  return (
    <Layout title="Explorar Babas">
      <List users={users} />
    </Layout>
  )
}
