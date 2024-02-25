import { ReactNode } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { ExpandButton } from '..'
import * as GS from '@/shared/styles'

type Props = {
  title: string
  cols: string[]
  children: ReactNode
  isFull: boolean
  handleLimit(): void
}

export function MembersRankingTable({
  title,
  cols,
  children,
  isFull,
  handleLimit
}: Props) {
  return (
    <>
      <Typography sx={GS.Title} component="h2" variant="h6" pt={3} pb={2}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
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
        </Table>
      </TableContainer>
    </>
  )
}
