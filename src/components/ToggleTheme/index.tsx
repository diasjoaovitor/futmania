import { ListItemButton } from '@mui/material'
import { Lightbulb } from '@mui/icons-material'
import { useThemeContext } from '@/contexts'

export function ToggleTheme() {
  const { toggleTheme } = useThemeContext()
  return (
    <ListItemButton onClick={toggleTheme}>
      <Lightbulb />
      Mudar Tema
    </ListItemButton>
  )
}
