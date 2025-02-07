import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import { AppBar } from './AppBar'
import * as S from './styles'

type TLayoutProps = {
  title: string
  children: ReactNode
}

export const Layout = ({ title, children }: TLayoutProps) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box sx={S.Wrapper}>
      <AppBar {...{ title, md }} />
      <Box sx={S.Content}>
        {md && (
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        )}
        <main>{children}</main>
      </Box>
    </Box>
  )
}
