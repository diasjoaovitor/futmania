import { Menu, MenuOpen } from '@mui/icons-material'
import {
  AppBar as MUIAppBar,
  CSSObject,
  Divider,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

import { Logo } from '..'
import { Nav } from './Nav'
import * as S from './styles'

type TAppBarProps = {
  title: string
  md: boolean
}

export const AppBar = ({ title, md }: TAppBarProps) => {
  const [open, setOpen] = useState(md)

  useEffect(() => {
    setOpen(md)
  }, [md])

  const handleMenuClick = () => {
    setOpen((open) => !open)
  }

  const MenuIcon = !open ? Menu : MenuOpen

  return (
    <>
      {open && !md && (
        <>
          <Toolbar />
          <Divider />
        </>
      )}
      <MUIAppBar
        sx={
          !open
            ? S.AppBarWrapper
            : ({ ...S.AppBarWrapper, ...S.Opened } as CSSObject)
        }
      >
        <Toolbar>
          {!md ? (
            <>
              <IconButton size="large" edge="start" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Typography ml={2} component="h1" variant="h6">
                {title}
              </Typography>
            </>
          ) : (
            <Logo />
          )}
        </Toolbar>
        <Divider />
        {open && <Nav />}
      </MUIAppBar>
    </>
  )
}
