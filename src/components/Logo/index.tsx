import { Box, Typography } from '@mui/material'

import { ViteIcon } from '@/icons'
import * as GS from '@/styles'

export const Logo = () => {
  return (
    <Box sx={GS.FlexRow}>
      <ViteIcon />
      <Typography ml={1} variant="h6">
        Futmania
      </Typography>
    </Box>
  )
}
