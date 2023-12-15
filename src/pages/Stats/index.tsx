import { Box, Typography } from '@mui/material'
import { AlertProps, Layout } from '@/shared/components'
import * as S from './style'

export function Stats() {
  return (
    <Box sx={S.Wrapper}>
      <Layout
        title="Estatísticas"
        alertProps={{} as AlertProps}
        isPending={false}
      >
        <Typography>Conteúdo de estatísticas</Typography>
      </Layout>
    </Box>
  )
}
