import { IconButton, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

type TExpandButtonProps = {
  isExpanded: boolean
  handleClick(): void
}
export const ExpandButton = ({
  isExpanded,
  handleClick
}: TExpandButtonProps) => {
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
