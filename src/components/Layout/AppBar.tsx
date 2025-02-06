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
  const [isOpened, setIsOpened] = useState(md)

  useEffect(() => {
    setIsOpened(md)
  }, [md])

  const handleOpen = () => setIsOpened((IsOpened) => !IsOpened)

  const MenuIcon = !isOpened ? Menu : MenuOpen
  return (
    <>
      {isOpened && !md && (
        <>
          <Toolbar />
          <Divider />
        </>
      )}
      <MUIAppBar
        sx={
          !isOpened
            ? S.AppBarWrapper
            : ({ ...S.AppBarWrapper, ...S.Opened } as CSSObject)
        }
      >
        <Toolbar>
          {!md ? (
            <>
              <IconButton size="large" edge="start" onClick={handleOpen}>
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
        {isOpened && <Nav />}
      </MUIAppBar>
    </>
  )
}
