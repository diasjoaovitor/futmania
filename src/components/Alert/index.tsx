import {
  AlertTitle,
  IconButton,
  Alert as MUIAlert,
  Snackbar
} from '@mui/material'
import { Close } from '@mui/icons-material'

export type TAlertProps = {
  isOpened: boolean
  severity: 'error' | 'info' | 'success' | 'warning'
  title: string
  description?: string
  autoHide?: boolean
  handleClose: () => void
}

export const Alert = ({
  isOpened,
  severity,
  title,
  description,
  autoHide,
  handleClose
}: TAlertProps) => {
  return (
    <Snackbar
      open={isOpened}
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
