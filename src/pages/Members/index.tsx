import { Box, Typography } from '@mui/material'
import { Layout } from '@/shared/components'
import * as S from './style'

export function Members() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Membros">
        <Typography>Conteúdo de membros</Typography>
      </Layout>
    </Box>
  )
}
