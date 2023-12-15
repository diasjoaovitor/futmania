import { useState } from 'react'

export function useDialog() {
  const [dialog, setDialog] = useState('')

  const dialogIsOpened = Boolean(dialog)

  const handleCloseDialog = () => setDialog('')

  return { dialog, setDialog, dialogIsOpened, handleCloseDialog }
}
