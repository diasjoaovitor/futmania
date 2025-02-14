import { Close } from '@mui/icons-material'
import {
  Alert,
  AlertProps,
  AlertTitle,
  IconButton,
  Snackbar
} from '@mui/material'

export type TNotificationParams = {
  severity: AlertProps['severity']
  title: string
  description?: string
  autoHideDuration?: number | null
}

type TNotificationProps = {
  open: boolean
  handleClose: () => void
} & TNotificationParams

export const Notification = ({
  open,
  severity,
  title,
  description,
  autoHideDuration,
  handleClose
}: TNotificationProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={autoHideDuration || 4000}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        action={
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Snackbar>
  )
}
