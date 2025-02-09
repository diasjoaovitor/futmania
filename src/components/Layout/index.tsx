import { ReactNode } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Alert, TAlertProps, AppBar, Loader } from '..'
import * as S from './styles'

type TLayoutProps = {
  title: string
  children: ReactNode
  isPending: boolean
  alertProps: TAlertProps
}

export const Layout = ({
  title,
  children,
  isPending,
  alertProps
}: TLayoutProps) => {
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
      <Loader open={isPending} />
      <Alert {...alertProps} />
    </Box>
  )
}
