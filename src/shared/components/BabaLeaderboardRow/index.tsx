import { useState } from 'react'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { getMemberById, sortByGoals } from '@/shared/functions'
import { TMember, TTeam } from '@/shared/types'

type Props = {
  team: TTeam
  members: TMember[]
  handleClick(member: TMember): void
}

type TTeamMember = {
  goals: number
  id: string
}

export function BabaLeaderboardRow({
  team,
  members: allMembers,
  handleClick
}: Props) {
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
                  const { id, goals } = member
                  const m = getMemberById(allMembers, id) as TMember
                  return (
                    <TableRow
                      key={id}
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
