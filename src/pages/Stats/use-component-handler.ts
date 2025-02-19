import { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

import { seasons } from '@/constants'
import { useAppContext } from '@/contexts'
import { TMemberModel } from '@/models'
import {
  getBabasInSeason,
  getCurrentDate,
  getCurrentSeason,
  getMembersStats,
  getMemberStats,
  getYear,
  getYears
} from '@/utils'

const currentDate = getCurrentDate()
const currentSeason = getCurrentSeason(seasons, currentDate)

export const useComponentHandler = () => {
  const { members, babas, finances } = useAppContext()

  const [year, setYear] = useState(getYear(currentDate))
  const [season, setSeason] = useState(currentSeason)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [member, setMember] = useState<TMemberModel | null>(null)

  const memberStats = member?.id ? getMemberStats(babas, member.id) : null
  const babasInSeason = getBabasInSeason(season, year, babas)
  const statsInSeason = getMembersStats(babasInSeason, members)
  const years = getYears(babas.map(({ date }) => date))

  const handleYearChange = (e: SelectChangeEvent) => {
    setYear(Number(e.target.value))
  }

  const handleSeasonChange = (e: SelectChangeEvent) => {
    setSeason(e.target.value)
  }

  const handleMemberClick = (member: TMemberModel) => {
    setMember(member)
    setIsStatsModalOpen(true)
  }

  return {
    finances,
    season,
    year,
    years,
    statsInSeason,
    member,
    memberStats,
    isStatsModalOpen,
    handleMemberClick,
    handleYearChange,
    handleSeasonChange,
    setIsStatsModalOpen
  }
}
