import { Close } from '@mui/icons-material'
import { Box, IconButton, Modal as MUIModal, Typography } from '@mui/material'

import * as S from './styles'

type TModalProps = {
  isOpened: boolean
  title: string
  children: React.ReactElement
  color?: string
  handleClose(): void
}

export const Modal = ({
  isOpened,
  title,
  children,
  color,
  handleClose
}: TModalProps) => {
  return (
    <MUIModal open={isOpened} onClose={handleClose} sx={S.Wrapper}>
      <Box sx={S.Content}>
        <Box sx={S.Header}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ '&::after': { backgroundColor: `${color} !important` } }}
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
    </MUIModal>
  )
}
