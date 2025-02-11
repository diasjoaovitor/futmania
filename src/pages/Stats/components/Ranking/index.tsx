import { TableCell, TableRow } from '@mui/material'
import { TStats, sortByGoals, sortMembersByRanking } from '@/utils'
import { useLimit } from '@/hooks'
import { TMember } from '@/types'
import { Table } from './Table'

type TRankingProps = {
  stats: TStats[]
  handleClick(member: TMember): void
}

const min = 5

export const Ranking = ({ stats, handleClick }: TRankingProps) => {
  const {
    limited: limitedScoreRanking,
    isFull: scoreRankingIsFull,
    handleLimit: handleLimitScoreRanking
  } = useLimit(sortMembersByRanking(stats), min)
  const {
    limited: limitedGoalsRanking,
    isFull: goalsRankingIsFull,
    handleLimit: handleLimitGoalsRanking
  } = useLimit(sortByGoals(stats), min)
  return (
    <>
      <Table
        title="Ranking"
        cols={['Posição', 'Nome', 'Score', 'Babas']}
        isFull={scoreRankingIsFull}
        handleLimit={handleLimitScoreRanking}
      >
        <>
          {(limitedScoreRanking as TStats[]).map((member, index) => {
            const { id, name, scoreRanking, numberOfBabas } = member
            return (
              <TableRow
                key={id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handleClick(member)}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{scoreRanking}</TableCell>
                <TableCell align="center">{numberOfBabas}</TableCell>
              </TableRow>
            )
          })}
        </>
      </Table>
      <Table
        title="Artilharia"
        cols={['Posição', 'Nome', 'Gols', 'Babas', 'Média']}
        isFull={goalsRankingIsFull}
        handleLimit={handleLimitGoalsRanking}
      >
        <>
          {(limitedGoalsRanking as TStats[]).map((member, index) => {
            const { id, name, goals, goalsAverage, numberOfBabas } = member
            return (
              <TableRow
                key={id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => handleClick(member)}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell align="center">{goals}</TableCell>
                <TableCell align="center">{numberOfBabas}</TableCell>
                <TableCell align="center">{goalsAverage.toFixed(2)}</TableCell>
              </TableRow>
            )
          })}
        </>
      </Table>
    </>
  )
}
