import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import { TBabaModel, TMemberModel } from '@/models'

import { LeaderboardRow } from './LeaderboardRow'
import { sortTeamsByScore } from './utils'

const cols = ['Classificação', 'PTS', 'V', 'E']

type TLeaderboardProps = {
  baba: TBabaModel
  members: TMemberModel[]
  handleClick(member: TMemberModel): void
}

export const Leaderboard = ({
  baba,
  members: allMembers,
  handleClick
}: TLeaderboardProps) => {
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
            <LeaderboardRow
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
