import { Box, Typography } from '@mui/material'
import { AlertProps, Layout } from '@/shared/components'
import * as S from './style'

export function Finances() {
  return (
    <Box sx={S.Wrapper}>
      <Layout title="Finanças" alertProps={{} as AlertProps} isPending={false}>
        <Typography>Conteúdo de finanças</Typography>
      </Layout>
    </Box>
  )
}
