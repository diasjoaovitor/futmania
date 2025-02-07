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
import { ReactNode } from 'react'

import { ToggleExpandButton } from '@/components'
import { useLimit } from '@/hooks'
import { TMemberModel } from '@/models'
import * as GS from '@/styles'
import { sortByGoals, sortMembersByRanking, TStats } from '@/utils'

type TMembersRankingTableProps = {
  title: string
  cols: string[]
  children: ReactNode
  isFull: boolean
  showToggleExpandButton: boolean
  handleLimit(): void
}

export const MembersRankingTable = ({
  title,
  cols,
  children,
  isFull,
  showToggleExpandButton,
  handleLimit
}: TMembersRankingTableProps) => {
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
            {showToggleExpandButton && (
              <TableRow>
                <TableCell colSpan={cols.length}>
                  <ToggleExpandButton
                    isExpanded={isFull}
                    handleClick={handleLimit}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

type TMembersRankingProps = {
  stats: TStats[]
  handleClick(member: TMemberModel): void
}

const min = 5

export const MembersRanking = ({
  stats,
  handleClick
}: TMembersRankingProps) => {
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
      <MembersRankingTable
        title="Ranking"
        cols={['Posição', 'Nome', 'Score', 'Babas']}
        isFull={scoreRankingIsFull}
        showToggleExpandButton={stats.length > min}
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
      </MembersRankingTable>
      <MembersRankingTable
        title="Artilharia"
        cols={['Posição', 'Nome', 'Gols', 'Babas', 'Média']}
        isFull={goalsRankingIsFull}
        showToggleExpandButton={stats.length > min}
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
      </MembersRankingTable>
    </>
  )
}
