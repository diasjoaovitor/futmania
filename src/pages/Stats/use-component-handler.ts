import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

import { TAlertProps, TMemberStatsModalProps } from '@/components'
import { seasons } from '@/constants'
import { useAppContext } from '@/contexts'
import { useAlert, useModal } from '@/hooks'
import { useQueriesMembersAndBabasAndFinances } from '@/react-query'
import { TBaba, TFinance, TMember } from '@/types'
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
  const { babaUser } = useAppContext()

  const [period, setPeriod] = useState({
    year: getYear(currentDate),
    season: currentSeason
  })
  const [finances, setFinances] = useState<TFinance[]>([])
  const [babas, setBabas] = useState<TBaba[]>([])
  const [member, setMember] = useState({} as TMember)
  const [members, setMembers] = useState<TMember[]>([])

  const { year, season } = period
  const dates = babas.map(({ date }) => date)
  const years = getYears(dates) as number[]

  const memberStats = member.id ? getMemberStats(babas, member.id) : null
  const babasInSeason = getBabasInSeason(season, year, babas)
  const statsInSeason = getMembersStats(babasInSeason, members)

  const {
    membersData,
    membersIsPending,
    isMembersError,
    babasData,
    babasIsPending,
    isBabasError,
    financesData,
    financesIsPending,
    isFinancesError
  } = useQueriesMembersAndBabasAndFinances(babaUser?.id)

  const { alert, setAlert, alertIsOpened, handleCloseAlert } = useAlert()
  const { modalIsOpened, handleOpenModal, handleCloseModal } = useModal()

  const description =
    'Verifique sua conexão com a internet ou atualize a página'

  useEffect(() => {
    if (membersData && babasData && financesData) {
      setMembers(membersData)
      setBabas(babasData)
      setFinances(financesData)
    }
  }, [membersData, babasData, financesData])

  useEffect(() => {
    if (!isMembersError || !isBabasError || isFinancesError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar os dados',
      description
    })
  }, [isMembersError, isBabasError, isFinancesError])

  const handlePeriodChange = (e: SelectChangeEvent) => {
    setPeriod((period) => ({
      ...period,
      [e.target.name]: e.target.value
    }))
  }

  const handleOpenMemberModal = (member: TMember) => {
    setMember(member)
    handleOpenModal()
  }

  const memberModalProps: TMemberStatsModalProps = {
    isOpened: modalIsOpened,
    finances,
    member,
    stats: memberStats,
    handleClose: handleCloseModal
  }

  const alertProps: TAlertProps = {
    ...alert,
    isOpened: alertIsOpened,
    handleClose: handleCloseAlert
  }

  const isPending = membersIsPending || babasIsPending || financesIsPending

  return {
    season,
    year,
    years,
    statsInSeason,
    handleOpenMemberModal,
    memberModalProps,
    handlePeriodChange,
    alertProps,
    isPending
  }
}
