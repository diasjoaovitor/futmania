import { Box, Typography } from '@mui/material'
import { Layout } from '@/shared/components'
import * as S from './style'

export function Babas() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Babas">
        <Typography>Conteúdo de babas</Typography>
      </Layout>
    </Box>
  )
}
