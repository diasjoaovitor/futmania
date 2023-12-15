import { useState } from 'react'

type TAlert = {
  severity: 'error' | 'info' | 'success' | 'warning'
  title: string
  description?: string
  autoHide?: boolean
}

export function useAlert() {
  const [alert, setAlert] = useState({} as TAlert)

  const alertIsOpened = Boolean(alert.title)

  const handleCloseAlert = () => setAlert({} as TAlert)

  return { alert, setAlert, alertIsOpened, handleCloseAlert }
}
