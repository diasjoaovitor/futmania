import { SelectChangeEvent } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { TMemberStatsModalProps } from '@/components'
import { useAppContext, useCallbackContext, useDialogContext } from '@/contexts'
import { TBabaModel, TMemberModel } from '@/models'
import {
  formatDate,
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
import { getBaba, getDatesInYearMonth } from './utils'

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

  const [year, setYear] = useState(getYear(currentDate))
  const [month, setMonth] = useState(getMonth(currentDate))
  const [date, setDate] = useState(currentDate)
  const [baba, setBaba] = useState<TBabaModel | null>(null)
  const [memberStatsModal, setMemberStatsModal] = useState(false)
  const [member, setMember] = useState<TMemberModel | null>(null)
  const [teamsFormModal, setTeamsFormModal] = useState(false)
  const [babaFormModal, setBabaFormModal] = useState(false)
  const [datesInYearMonth, setDatesInYearMonth] = useState<string[]>([
    currentDate
  ])

  const dates = useMemo(
    () => babas.map(({ date }) => date) || [currentDate],
    [babas]
  )

  const lastBabaDate = dates.at(-1) || currentDate

  const years = getYears(dates) as number[]

  useEffect(() => {
    setYear(getYear(lastBabaDate))
    setMonth(getMonth(lastBabaDate))
    setDate(lastBabaDate)
    setBaba(getBaba(babas, lastBabaDate))
  }, [lastBabaDate, babas])

  useEffect(() => {
    const datesInMonth = getDatesInYearMonth(year, month, dates) || [
      formatDate(`${year}-${month + 1}-01`)
    ]
    setDatesInYearMonth(datesInMonth)
    const date = datesInMonth[0]
    setDate(date)
    setBaba(getBaba(babas, date))
  }, [year, month, dates, babas])

  const handleYearChange = (e: SelectChangeEvent) => {
    setYear(Number(e.target.value))
  }

  const handleMonthChange = (e: SelectChangeEvent) => {
    setMonth(Number(e.target.value))
  }

  const handleDateChange = (e: SelectChangeEvent) => {
    const date = e.target.value
    setDate(date)
    setBaba(getBaba(babas, date))
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
    date,
    month,
    year,
    years,
    dates: datesInYearMonth,
    handleYearChange,
    handleMonthChange,
    handleDateChange
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
