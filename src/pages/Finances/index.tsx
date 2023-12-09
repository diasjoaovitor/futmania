import { Box, Typography } from '@mui/material'
import { Layout } from '@/shared/components'
import * as S from './style'

export function Finances() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Finanças">
        <Typography>Conteúdo de finanças</Typography>
      </Layout>
    </Box>
  )
}
