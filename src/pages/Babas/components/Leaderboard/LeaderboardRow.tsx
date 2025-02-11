import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { useState } from 'react'

import { TMember, TTeam } from '@/types'
import { getMemberById, sortByGoals } from '@/utils'

type TLeaderboardRowProps = {
  team: TTeam
  members: TMember[]
  handleClick(member: TMember): void
}

type TTeamMember = {
  goals: number
  memberId: string
}

export const LeaderboardRow = ({
  team,
  members: allMembers,
  handleClick
}: TLeaderboardRowProps) => {
  const [open, setOpen] = useState(false)

  const { name, draws, wins, members } = team
  const score = wins * 3 + draws

  const cols = [score, wins, draws]

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen((open) => !open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          {name}
        </TableCell>
        {cols.map((col, index) => (
          <TableCell key={index} align="center">
            {col}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={cols.length + 1} sx={{ py: 0, borderWidth: 2 }}>
          <Collapse in={open}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Gols</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(sortByGoals([...members]) as TTeamMember[]).map((member) => {
                  const { memberId, goals } = member
                  const m = getMemberById(allMembers, memberId)
                  if (!m) return null
                  return (
                    <TableRow
                      key={memberId}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleClick(m)}
                    >
                      <TableCell>{m.name}</TableCell>
                      <TableCell align="center">{goals}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
