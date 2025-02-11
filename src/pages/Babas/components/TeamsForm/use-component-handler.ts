import { Dayjs } from 'dayjs'
import { ChangeEvent, useState } from 'react'

import { currentDate } from '@/constants'
import { useModal } from '@/hooks'
import { TTeam } from '@/types'

import { assignTeams, drawTeams } from './utils'

export const useComponentHandler = () => {
  const [date, setDate] = useState(currentDate)
  const [isPrizeDraw, setIsPrizeDraw] = useState(true)
  const [checkedMembers, setCheckedMembers] = useState<string[]>([])
  const [drawnMembers, setDrawnMembers] = useState<string[]>([])
  const [teams, setTeams] = useState<TTeam[]>([])
  const [numberOfTeams, setNumberOfTeams] = useState(4)
  const [selectedTeam, setSelectedTeam] = useState(1)

  const { modalIsOpened, handleOpenModal, handleCloseModal } = useModal()

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
    handleOpenModal()
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
    handleOpenModal,
    handleCloseModal
  }
}
