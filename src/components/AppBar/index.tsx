import {
  AppBar as MUIAppBar,
  Typography,
  Toolbar,
  IconButton,
  CSSObject,
  Divider
} from '@mui/material'
import { Menu, MenuOpen } from '@mui/icons-material'
import { Logo, Nav } from '..'
import { useComponentHandler } from './use-component-handler'
import * as S from './styles'

type TAppBarProps = {
  title: string
  md: boolean
}

export const AppBar = ({ title, md }: TAppBarProps) => {
  const { isOpened, handleOpen } = useComponentHandler(md)
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
          !isOpened ? S.Wrapper : ({ ...S.Wrapper, ...S.Opened } as CSSObject)
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
