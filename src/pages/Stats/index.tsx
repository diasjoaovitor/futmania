import { Box, Typography } from '@mui/material'
import { Layout } from '@/shared/components'
import * as S from './style'

export function Stats() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Estatísticas">
        <Typography>Conteúdo de estatísticas</Typography>
      </Layout>
    </Box>
  )
}
