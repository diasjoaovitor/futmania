import { Close } from '@mui/icons-material'
import { Box, IconButton, Modal as MuiModal, Typography } from '@mui/material'

import * as S from './styles'

type TModalProps = {
  dataTestId?: string
  isOpened: boolean
  title: string
  children: React.ReactElement
  color?: 'primary' | 'error'
  handleClose(): void
}

export const Modal = ({
  dataTestId,
  isOpened,
  title,
  children,
  color,
  handleClose
}: TModalProps) => {
  return (
    <MuiModal
      data-testid={dataTestId}
      open={isOpened}
      onClose={handleClose}
      sx={S.Wrapper}
    >
      <Box sx={S.Content}>
        <Box sx={S.Header}>
          <Typography
            component="h2"
            variant="h6"
            sx={{
              '&::after': {
                backgroundColor: `${color === 'error' ? '#f44336' : '#90caf9'} !important`
              }
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={handleClose}
            data-testid={`close-${title
              .toLocaleLowerCase()
              .replace(/ /g, '-')}`}
          >
            <Close />
          </IconButton>
        </Box>
        {children}
      </Box>
    </MuiModal>
  )
}
