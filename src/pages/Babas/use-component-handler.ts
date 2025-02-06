import { SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

import { TMemberStatsModalProps } from '@/components'
import { useAppContext, useCallbackContext, useDialogContext } from '@/contexts'
import { TMemberModel } from '@/models'
import {
  getCurrentDate,
  getMemberStats,
  getMonth,
  getYear,
  getYears
} from '@/utils'

import {
  TBabaFormProps,
  TTeamsFormProps,
  TYearMonthDaySelectProps
} from './components'
import { getDatesInYearMonth } from './utils'

const currentDate = getCurrentDate()

export const useComponentHandler = () => {
  const { setErrorCallbacks, setSuccessCallbacks } = useCallbackContext()
  const {
    babas,
    members,
    finances,
    isAuthenticatedInTheSelectedBaba,
    babaMutationDeleteMutate
  } = useAppContext()
  const dialog = useDialogContext()

  const dates = babas.map(({ date }) => date) || [currentDate]
  const lastBabaDate = dates.at(-1) || currentDate

  const [period, setPeriod] = useState({
    year: getYear(lastBabaDate),
    month: getMonth(lastBabaDate),
    date: lastBabaDate
  })
  const [memberStatsModal, setMemberStatsModal] = useState(false)
  const [member, setMember] = useState<TMemberModel | null>(null)
  const [teamsFormModal, setTeamsFormModal] = useState(false)
  const [babaFormModal, setBabaFormModal] = useState(false)

  useEffect(() => {
    setPeriod({
      year: getYear(lastBabaDate),
      month: getMonth(lastBabaDate),
      date: lastBabaDate
    })
  }, [lastBabaDate])

  const baba = babas.find(({ date }) => date === period.date) || null

  const datesInYearMonth = baba
    ? getDatesInYearMonth(getYear(baba.date), getMonth(baba.date), dates)
    : [currentDate]

  const years = getYears(dates) as number[]

  const handlePeriodChange = (e: SelectChangeEvent) => {
    setPeriod((period) => ({
      ...period,
      [e.target.name]: e.target.value
    }))
  }

  const handleMemberStatsModalOpen = (member: TMemberModel) => {
    setMember(member)
    setMemberStatsModal(true)
  }

  const handleBabaDelete = () => {
    setErrorCallbacks([dialog.close])
    setSuccessCallbacks([dialog.close])
    dialog.show({
      title: 'Tem certeza que deseja Excluir este Baba?',
      handleAccept: () => babaMutationDeleteMutate(baba!.id)
    })
  }

  const stats = member ? getMemberStats(babas, member.id) : null

  const yearMonthDaySelectProps: TYearMonthDaySelectProps = {
    ...period,
    years,
    dates: datesInYearMonth,
    handleChange: handlePeriodChange
  }

  const memberStatsModalProps: TMemberStatsModalProps = {
    finances,
    isOpened: memberStatsModal,
    member,
    stats,
    handleClose: () => setMemberStatsModal(false)
  }

  const babaFormProps: Omit<TBabaFormProps, 'baba'> = {
    isOpened: babaFormModal,
    members,
    handleClose: () => setBabaFormModal(false)
  }

  const teamsFormProps: TTeamsFormProps = {
    isOpened: teamsFormModal,
    finances,
    members,
    handleClose: () => setTeamsFormModal(false)
  }

  return {
    isAuthenticatedInTheSelectedBaba,
    yearMonthDaySelectProps,
    baba,
    members,
    memberStatsModalProps,
    handleMemberStatsModalOpen,
    setTeamsFormModal,
    babaFormProps,
    setBabaFormModal,
    handleBabaDelete,
    teamsFormProps
  }
}
