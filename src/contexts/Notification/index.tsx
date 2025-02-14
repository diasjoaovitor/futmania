import { createContext, useCallback, useContext, useState } from 'react'

import { Notification, TNotificationParams } from './Notification'

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
