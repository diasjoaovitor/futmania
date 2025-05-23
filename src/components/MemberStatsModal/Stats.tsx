import {
  Newspaper,
  Sports,
  SportsSoccer,
  StarRate,
  SvgIconComponent
} from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@mui/material'

import { TMemberStats } from '@/utils'

import * as S from './styles'

type TListItems = {
  title: string
  value: number
  icon: SvgIconComponent
}

type TStatsProps = {
  stats: TMemberStats
}

export const Stats = ({ stats }: TStatsProps) => {
  const { numberOfBabas, numberOfMostScore, score, goals } = stats

  const listItems: TListItems[] = [
    {
      title: 'Babas',
      value: numberOfBabas,
      icon: Sports
    },
    {
      title: 'Capas',
      value: numberOfMostScore,
      icon: StarRate
    },
    {
      title: 'Pontos',
      value: score,
      icon: Newspaper
    },
    {
      title: 'Gols',
      value: goals,
      icon: SportsSoccer
    }
  ]

  return (
    <List>
      <ListSubheader sx={{ position: 'static' }}>Estatísticas</ListSubheader>
      {listItems.map(({ title, value, icon: Icon }, index) => (
        <ListItem key={index} sx={S.StatsLi}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={title} />
          <ListItemText primary={value} />
        </ListItem>
      ))}
    </List>
  )
}
