import {
  Button,
  Dialog as _Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material'
import { createContext, useCallback, useContext, useState } from 'react'

type TDialogParams = {
  title: string
  handleAccept(): void
}

type TDialogProps = {
  open: boolean
  handleClose(): void
} & TDialogParams

const Dialog = ({ open, title, handleClose, handleAccept }: TDialogProps) => {
  return (
    <_Dialog open={!!open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleAccept} color="error">
          Sim
        </Button>
        <Button onClick={handleClose}>Não</Button>
      </DialogActions>
    </_Dialog>
  )
}

export type TDialogContext = {
  show: (params: TDialogParams) => void
  close: () => void
}

const DialogContext = createContext({} as TDialogContext)

export const useDialogContext = () => useContext(DialogContext)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogParams, setDialogParams] = useState<TDialogParams>()

  const show = useCallback((params: TDialogParams) => {
    setDialogParams(params)
  }, [])

  const close = useCallback(() => {
    setDialogParams(undefined)
  }, [])

  return (
    <DialogContext.Provider value={{ show, close }}>
      {children}
      <Dialog
        {...(dialogParams as TDialogParams)}
        open={!!dialogParams}
        handleClose={close}
      />
    </DialogContext.Provider>
  )
}
