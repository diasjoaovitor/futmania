import { IconButton, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

type Props = {
  isExpanded: boolean
  handleClick(): void
}
export function ExpandButton({ isExpanded, handleClick }: Props) {
  const button = !isExpanded
    ? {
        title: 'Ver mais',
        icon: ExpandMore
      }
    : {
        title: 'Ver menos',
        icon: ExpandLess
      }
  const { title, icon: Icon } = button
  return (
    <IconButton sx={{ display: 'flex' }} size="small" onClick={handleClick}>
      <Icon />
      <Typography>{title}</Typography>
    </IconButton>
  )
}
