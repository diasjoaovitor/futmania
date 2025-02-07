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
import { ReactNode } from 'react'

import { ToggleExpandButton } from '@/components'
import { useLimit } from '@/hooks'
import { TMemberModel } from '@/models'
import * as GS from '@/styles'
import { sortByGoals, sortMembersByRanking, TStats } from '@/utils'

type TTableProps = {
  title: string
  cols: string[]
  children: ReactNode
  isFull: boolean
  showToggleExpandButton: boolean
  handleLimit(): void
}

export const Table = ({
  title,
  cols,
  children,
  isFull,
  showToggleExpandButton,
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
        </MuiTable>
      </TableContainer>
    </>
  )
}

type TContentProps = {
  stats: TStats[]
  handleClick(member: TMemberModel): void
}

const min = 5

export const Content = ({ stats, handleClick }: TContentProps) => {
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
      </Table>
      <Table
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
      </Table>
    </>
  )
}
