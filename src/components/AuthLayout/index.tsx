import { Box, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { Logo } from '@/components'

import * as S from './styles'

type TAuthProps = {
  title: string
  children: ReactNode
}

export const AuthLayout = ({ title, children }: TAuthProps) => {
  return (
    <Box sx={S.Wrapper}>
      <Logo />
      <Paper sx={S.Paper}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  )
}
