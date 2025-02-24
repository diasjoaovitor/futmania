import { Backdrop, CircularProgress } from '@mui/material'

export const Loader = ({ open }: { open?: boolean }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={!!open}
      data-testid={`loader-${!!open}`}
    >
      <CircularProgress />
    </Backdrop>
  )
}
