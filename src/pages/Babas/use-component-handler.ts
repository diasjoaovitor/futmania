import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { TAlertProps, TDialogProps, TMemberModalProps } from '@/components'
import {
  useMutationCreateBaba,
  useMutationDeleteBaba,
  useMutationUpdateBaba,
  useQueriesMembersAndBabasAndFinances
} from '@/react-query'
import { useAuthContext } from '@/contexts'
import {
  getMemberStats,
  getMonth,
  getYear,
  getYears,
  sortByDate
} from '@/utils'
import { useAlert, useDialog, useModal } from '@/hooks'
import { TBaba, TFinance, TMember, TTeam } from '@/types'
import { createdAt, currentDate } from '@/constants'
import { TeamsFormProps, TFormProps } from './components'
import { getBabaDatesInYearMonth } from './utils'

export const useComponentHandler = () => {
  const { user, babaUser } = useAuthContext()
  const [period, setPeriod] = useState({
    year: getYear(currentDate),
    month: getMonth(currentDate),
    date: currentDate
  })
  const [babaDates, setBabaDates] = useState([currentDate])
  const [baba, setBaba] = useState<TBaba>()
  const [babas, setBabas] = useState<TBaba[]>([])
  const [member, setMember] = useState({} as TMember)
  const [members, setMembers] = useState<TMember[]>([])
  const [finances, setFinances] = useState<TFinance[]>([])

  const id = user?.uid || babaUser.id
  const { year, month, date } = period
  const dates = babas.map(({ date }) => date)
  const years = getYears(dates) as number[]
  const stats = member.id ? getMemberStats(babas, member.id) : null

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

  const {
    mutate: mutateCreate,
    data: mutateDataCreate,
    isError: isCreateError,
    isPending: createIsPending
  } = useMutationCreateBaba()
  const {
    mutate: mutateUpdate,
    data: mutateDataUpdate,
    isError: isUpdateError,
    isPending: updateIsPending
  } = useMutationUpdateBaba()
  const {
    mutate: mutateDelete,
    data: mutateDataDelete,
    isError: isDeleteError,
    isPending: deleteIsPending
  } = useMutationDeleteBaba()

  const { alert, setAlert, alertIsOpened, handleCloseAlert } = useAlert()
  const {
    modalIsOpened: babaModalIsOpened,
    handleOpenModal: handleOpenBabaModal,
    handleCloseModal: handleCloseBabaModal
  } = useModal()
  const {
    modalIsOpened: teamsModalIsOpened,
    handleOpenModal: handleOpenTeamsModal,
    handleCloseModal: handleCloseTeamsModal
  } = useModal()
  const {
    modalIsOpened: memberModalIsOpened,
    handleOpenModal: handleOpenMbModal,
    handleCloseModal: handleCloseMemberModal
  } = useModal()
  const { dialog, dialogIsOpened, setDialog, handleCloseDialog } = useDialog()

  const description =
    'Verifique sua conexão com a internet ou atualize a página'

  useEffect(() => {
    if (membersData && babasData && financesData) {
      setMembers(membersData)
      setBabas(sortByDate(babasData) as TBaba[])
      setFinances(financesData)
    }
  }, [membersData, babasData, financesData])

  useEffect(() => {
    if (babas.length > 0) {
      const baba = babas.at(-1) as TBaba
      setBaba(baba)
      const { date } = baba
      const year = getYear(date)
      const month = getMonth(date)
      const babaDates = getBabaDatesInYearMonth(year, month, dates)
      setBabaDates(babaDates)
      setPeriod({ year, month, date })
    }
  }, [babas])

  useEffect(() => {
    const baba = babas.find(({ date: d }) => d === date)
    setBaba(baba)
  }, [date])

  useEffect(() => {
    const babaDates = getBabaDatesInYearMonth(year, month, dates)
    const bds = babaDates.length > 0 ? babaDates : [`${year}-${month + 1}-01`]
    setBabaDates(bds)
    const date = bds.at(-1) as string
    setPeriod((period) => ({
      ...period,
      date
    }))
    const baba = babas.find(({ date: d }) => d === date)
    setBaba(baba)
  }, [year, month])

  useEffect(() => {
    if (!isMembersError || !isBabasError || !isFinancesError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar os dados',
      description
    })
  }, [isMembersError, isBabasError, isFinancesError])

  useEffect(() => {
    if (!isCreateError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível criar o baba',
      description
    })
  }, [isCreateError])

  useEffect(() => {
    if (!isUpdateError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível atualizar o baba',
      description
    })
  }, [isUpdateError])

  useEffect(() => {
    if (!isDeleteError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível excluir o baba',
      description
    })
  }, [isDeleteError])

  useEffect(() => {
    if (!mutateDataCreate) return
    setAlert({
      severity: 'info',
      title: 'Baba criado com sucesso!',
      autoHide: true
    })
    setBabas((babas) => sortByDate([...babas, mutateDataCreate]) as TBaba[])
    const { date } = mutateDataCreate
    setPeriod({
      year: getYear(date),
      month: getMonth(date),
      date
    })
    handleCloseTeamsModal()
  }, [mutateDataCreate])

  useEffect(() => {
    if (!mutateDataUpdate) return
    setAlert({
      severity: 'info',
      title: 'Baba editado com sucesso!',
      autoHide: true
    })
    setBabas(
      (babas) =>
        sortByDate(
          babas.map((baba) =>
            baba.id !== mutateDataUpdate.id ? baba : mutateDataUpdate
          )
        ) as TBaba[]
    )
    const { date } = mutateDataUpdate
    setPeriod({
      year: getYear(date),
      month: getMonth(date),
      date
    })
    handleCloseBabaModal()
  }, [mutateDataUpdate])

  useEffect(() => {
    if (!mutateDataDelete) return
    setAlert({
      severity: 'info',
      title: 'Baba excluído com sucesso!',
      autoHide: true
    })
    setBabas(
      (babas) =>
        sortByDate(
          babas.filter((baba) => baba.id !== mutateDataDelete)
        ) as TBaba[]
    )
  }, [mutateDataDelete])

  const handlePeriodChange = (e: SelectChangeEvent) => {
    setPeriod((period) => ({
      ...period,
      [e.target.name]: e.target.value
    }))
  }

  const handleOpenMemberModal = (member: TMember) => {
    setMember(member)
    handleOpenMbModal()
  }

  const handleOpenDialogDelete = () => {
    setDialog(`Deseja realmente excluir?`)
  }

  const handleDelete = () => {
    if (!baba?.id) {
      setAlert({
        severity: 'error',
        title: `Não foi possível excluir!`,
        description: description
      })
      return
    }
    handleCloseDialog()
    mutateDelete(baba.id)
  }

  const handleUpdate = (baba: TBaba) => {
    mutateUpdate(baba)
  }

  const handleCreate = (teams: TTeam[], date: string) => {
    const data: TBaba = {
      createdAt,
      date,
      userId: user?.uid as string,
      teams
    }
    mutateCreate(data)
  }

  const formProps: TFormProps = {
    isOpened: babaModalIsOpened,
    baba: baba as TBaba,
    members,
    handleClose: handleCloseBabaModal,
    handleUpdate
  }

  const teamsFormProps: TeamsFormProps = {
    isOpened: teamsModalIsOpened,
    members,
    finances,
    handleClose: handleCloseTeamsModal,
    handleSubmit: handleCreate
  }

  const memberModalProps: TMemberModalProps = {
    isOpened: memberModalIsOpened,
    member,
    stats,
    finances,
    handleClose: handleCloseMemberModal
  }

  const alertProps: TAlertProps = {
    ...alert,
    isOpened: alertIsOpened,
    handleClose: handleCloseAlert
  }

  const dialogProps: TDialogProps = {
    isOpened: dialogIsOpened,
    title: dialog,
    handleAccept: handleDelete,
    handleClose: handleCloseDialog
  }

  const isPending =
    membersIsPending ||
    babasIsPending ||
    financesIsPending ||
    createIsPending ||
    updateIsPending ||
    deleteIsPending

  return {
    user,
    period,
    babaDates,
    handlePeriodChange,
    years,
    baba,
    members,
    handleOpenBabaModal,
    handleOpenTeamsModal,
    handleOpenMemberModal,
    handleOpenDialogDelete,
    formProps,
    teamsFormProps,
    memberModalProps,
    alertProps,
    dialogProps,
    isPending
  }
}
