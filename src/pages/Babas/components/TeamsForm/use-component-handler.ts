import { Dayjs } from 'dayjs'
import { ChangeEvent, useState } from 'react'

import { TTeam } from '@/models'
import { getCurrentDate } from '@/utils'

import { assignTeams, drawTeams } from './utils'

export const useComponentHandler = () => {
  const [date, setDate] = useState(getCurrentDate())
  const [isPrizeDraw, setIsPrizeDraw] = useState(true)
  const [checkedMembers, setCheckedMembers] = useState<string[]>([])
  const [drawnMembers, setDrawnMembers] = useState<string[]>([])
  const [teams, setTeams] = useState<TTeam[]>([])
  const [numberOfTeams, setNumberOfTeams] = useState(4)
  const [selectedTeam, setSelectedTeam] = useState(1)

  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleDateChange = (e: Dayjs | null) => {
    if (e === null) return
    const date = e.format('YYYY-MM-DD')
    setDate(date)
  }

  const handleIsPrizeDrawChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrizeDraw(e.currentTarget.checked)
  }

  const handleNumberOfTeamsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfTeams(Number(e.target.value))
  }

  const handleSelectedTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTeam(Number(e.target.value))
  }

  const handleClear = () => {
    setTeams([])
    setDrawnMembers([])
    setCheckedMembers([])
    setSelectedTeam(1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    setCheckedMembers((ids) =>
      checked ? [...ids, value] : checkedMembers.filter((id) => value !== id)
    )
  }

  const handleTeams = () => {
    setTeams(
      isPrizeDraw
        ? drawTeams(teams, checkedMembers, numberOfTeams)
        : assignTeams(teams, checkedMembers, selectedTeam)
    )
    !isPrizeDraw && setSelectedTeam((value) => value + 1)
    setDrawnMembers((drawn) => [...drawn, ...checkedMembers])
    setCheckedMembers([])
    setModalIsOpened(true)
  }

  return {
    date,
    handleDateChange,
    isPrizeDraw,
    handleIsPrizeDrawChange,
    checkedMembers,
    drawnMembers,
    handleChange,
    numberOfTeams,
    handleNumberOfTeamsChange,
    selectedTeam,
    handleSelectedTeamChange,
    teams,
    handleTeams,
    handleClear,
    modalIsOpened,
    setModalIsOpened
  }
}
