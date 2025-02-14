import { Link as MuiLink } from '@mui/material'
import { Link } from 'react-router'

import { AuthLayout, Layout } from '@/components'
import { useAppContext } from '@/contexts'

import { List } from './List'

export const Explorer = () => {
  const { users, babaUser } = useAppContext()

  if (!babaUser)
    return (
      <AuthLayout title="Explorar Babas">
        <List users={users} />
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
