import { Box, Typography } from '@mui/material'
import { AlertProps, Layout } from '@/shared/components'
import * as S from './style'

export function Babas() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Babas" alertProps={{} as AlertProps} isPending={false}>
        <Typography>Conteúdo de babas</Typography>
      </Layout>
    </Box>
  )
}
