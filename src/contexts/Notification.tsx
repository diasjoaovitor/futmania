import { createContext, useCallback, useContext, useState } from 'react'
import {
  AlertTitle,
  IconButton,
  Alert,
  Snackbar,
  AlertProps
} from '@mui/material'
import { Close } from '@mui/icons-material'

type TNotificationParams = {
  severity: AlertProps['severity']
  title: string
  description?: string
  autoHideDuration?: number
}

type TNotificationProps = {
  open: boolean
  handleClose: () => void
} & TNotificationParams

const Notification = ({
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

type TNotificationContext = (params: TNotificationParams) => void

const NotificationContext = createContext({} as TNotificationContext)

export const useNotificationContext = () => useContext(NotificationContext)

export const NotificationProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [notificationParams, setNotificationParams] =
    useState<TNotificationParams>()

  const notification = useCallback((params: TNotificationParams) => {
    setNotificationParams(params)
  }, [])

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      <Notification
        {...(notificationParams as TNotificationParams)}
        open={!!notificationParams}
        handleClose={() => setNotificationParams(undefined)}
      />
    </NotificationContext.Provider>
  )
}
