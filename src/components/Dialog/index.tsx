import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog as MUIDialog
} from '@mui/material'

export type DialogProps = {
  isOpened: boolean
  title: string
  handleClose(): void
  handleAccept(): void
}

export function Dialog({
  isOpened,
  title,
  handleClose,
  handleAccept
}: DialogProps) {
  return (
    <MUIDialog open={isOpened} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleAccept}>
          Sim
        </Button>
        <Button onClick={handleClose} color="error">
          Não
        </Button>
      </DialogActions>
    </MUIDialog>
  )
}
