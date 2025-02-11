import {
  Button,
  Dialog as MUIDialog,
  DialogActions,
  DialogTitle
} from '@mui/material'

export type TDialogProps = {
  isOpened: boolean
  title: string
  handleClose(): void
  handleAccept(): void
}

export const Dialog = ({
  isOpened,
  title,
  handleClose,
  handleAccept
}: TDialogProps) => {
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
