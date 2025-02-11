import { ReactNode } from 'react'
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { ExpandButton } from '@/components'
import * as GS from '@/styles'

type TTableProps = {
  title: string
  cols: string[]
  children: ReactNode
  isFull: boolean
  handleLimit(): void
}

export const Table = ({
  title,
  cols,
  children,
  isFull,
  handleLimit
}: TTableProps) => {
  return (
    <>
      <Typography sx={GS.Title} component="h2" variant="h6" pt={3} pb={2}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {cols.map((col, index) => (
                <TableCell
                  key={index}
                  align={`${index !== 1 ? 'center' : 'left'}`}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children}
            <TableRow>
              <TableCell colSpan={cols.length}>
                <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
              </TableCell>
            </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  )
}
