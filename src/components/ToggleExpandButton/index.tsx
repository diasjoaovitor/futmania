import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'

type TToggleExpandButtonProps = {
  isExpanded: boolean
  handleClick(): void
}

export const ToggleExpandButton = ({
  isExpanded,
  handleClick
}: TToggleExpandButtonProps) => {
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
