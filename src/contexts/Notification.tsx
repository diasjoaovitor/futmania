import { Close } from '@mui/icons-material'
import {
  Alert,
  AlertProps,
  AlertTitle,
  IconButton,
  Snackbar} from '@mui/material'
import { createContext, useCallback, useContext, useState } from 'react'

type TNotificationParams = {
  severity: AlertProps['severity']
  title: string
  description?: string
  autoHideDuration?: number | null
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
