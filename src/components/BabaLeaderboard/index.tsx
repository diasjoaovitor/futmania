import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { TBaba, TMember } from '@/types'
import { sortTeamsByScore } from './functions'
import { BabaLeaderboardRow } from '..'

const cols = ['Classificação', 'PTS', 'V', 'E']

type Props = {
  baba: TBaba
  members: TMember[]
  handleClick(member: TMember): void
}

export function BabaLeaderboard({
  baba,
  members: allMembers,
  handleClick
}: Props) {
  const { teams } = baba
  return (
    <TableContainer component={Paper} sx={{ my: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {cols.map((col, index) => (
              <TableCell key={index} align="center">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortTeamsByScore([...teams]).map((team) => (
            <BabaLeaderboardRow
              key={team.name}
              team={team}
              members={allMembers}
              handleClick={handleClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
