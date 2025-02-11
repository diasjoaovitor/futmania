import { Check, Close } from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader
} from '@mui/material'
import { useState } from 'react'

import * as GS from '@/styles'
import { getDayNumMonthExtensiveYearNum, sortByDate, TFrequency } from '@/utils'

import { ExpandButton } from '..'

type TFrequencyProps = {
  frequency: TFrequency[]
}

export const Frequency = ({ frequency }: TFrequencyProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const sortedFrequency = sortByDate(frequency) as TFrequency[]

  return (
    <List>
      <ListSubheader sx={{ position: 'static' }}>Frequência</ListSubheader>
      {sortedFrequency.length > 0 ? (
        <>
          {!open ? (
            <Box sx={GS.FlexRow}>
              {sortedFrequency
                .slice(-5, sortedFrequency.length)
                .map(({ date, showedUp }) => (
                  <ListItem
                    key={date}
                    sx={{ p: 0, pt: 1 }}
                    data-testid="frequency-item"
                    onClick={handleOpen}
                  >
                    <ListItemButton sx={{ p: 0, textAlign: 'center' }}>
                      <ListItemText
                        primary={showedUp ? <Check /> : <Close />}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </Box>
          ) : (
            <>
              {[...sortedFrequency].reverse().map(({ date, showedUp }) => {
                const d = getDayNumMonthExtensiveYearNum(date)
                return (
                  <ListItem
                    key={date}
                    sx={{ ...GS.FlexRow, gap: 2 }}
                    data-testid="frequency-item"
                  >
                    {showedUp ? <Check /> : <Close />}
                    {d}
                  </ListItem>
                )
              })}
            </>
          )}
          {open && (
            <ListItem disablePadding>
              <ExpandButton isExpanded={true} handleClick={handleClose} />
            </ListItem>
          )}
        </>
      ) : (
        <ListItem>
          <ListItemText primary={<Close />} />
        </ListItem>
      )}
    </List>
  )
}
