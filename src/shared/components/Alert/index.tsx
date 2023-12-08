import {
  AlertTitle,
  IconButton,
  Alert as MUIAlert,
  Snackbar
} from '@mui/material'
import { Close } from '@mui/icons-material'

type Props = {
  open: boolean
  severity: 'error' | 'info' | 'success' | 'warning'
  title: string
  description?: string
  autoHide?: boolean
  handleClose: () => void
}

export function Alert({
  open,
  severity,
  title,
  description,
  autoHide,
  handleClose
}: Props) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={!autoHide ? null : 4000}
      onClose={handleClose}
    >
      <MUIAlert
        severity={severity}
        action={
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {description}
      </MUIAlert>
    </Snackbar>
  )
}
