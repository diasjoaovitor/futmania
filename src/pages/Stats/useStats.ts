import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { AlertProps, MemberModalProps } from '@/components'
import { useQueriesMembersAndBabasAndFinances } from '@/react-query'
import { useAuthContext } from '@/contexts'
import {
  getBabasInSeason,
  getMemberStats,
  getMembersStats,
  getYear,
  getYears
} from '@/functions'
import { useAlert, useModal } from '@/hooks'
import { TBaba, TFinance, TMember } from '@/types'
import { currentDate, currentSeason } from '@/states'

export function useStats() {
  const { user, babaUser } = useAuthContext()
  const [period, setPeriod] = useState({
    year: getYear(currentDate),
    season: currentSeason
  })
  const [finances, setFinances] = useState<TFinance[]>([])
  const [babas, setBabas] = useState<TBaba[]>([])
  const [member, setMember] = useState({} as TMember)
  const [members, setMembers] = useState<TMember[]>([])

  const id = user?.uid || babaUser.id
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
  } = useQueriesMembersAndBabasAndFinances(id)

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

  const memberModalProps: MemberModalProps = {
    isOpened: modalIsOpened,
    finances,
    member,
    stats: memberStats,
    handleClose: handleCloseModal
  }

  const alertProps: AlertProps = {
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
