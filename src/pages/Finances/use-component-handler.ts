import { SelectChangeEvent } from '@mui/material'
import { Dayjs } from 'dayjs'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { TAlertProps, TDialogProps } from '@/components'
import { currentDate } from '@/constants'
import { useAuthContext } from '@/contexts'
import { useAlert, useDialog, useModal } from '@/hooks'
import {
  useMutationCreateFinance,
  useMutationCreateFinances,
  useMutationDeleteFinance,
  useMutationUpdateFinance,
  useQueryFinances,
  useQueryMembers
} from '@/react-query'
import { TFinance, TMember } from '@/types'
import { getMemberById, getMonth, getYear } from '@/utils'

import { TFormProps } from './components'
import { defaultFinanceState } from './constants'
import { getPayments, getWallet } from './utils'

export const useComponentHandler = () => {
  const { user, babaUser } = useAuthContext()
  const [period, setPeriod] = useState({
    year: getYear(currentDate),
    month: getMonth(currentDate)
  })
  const [finance, setFinance] = useState(defaultFinanceState)
  const [finances, setFinances] = useState<TFinance[]>([])
  const [members, setMembers] = useState<TMember[]>([])
  const [checkedMembers, setCheckedMembers] = useState<string[]>([])

  const id = user?.uid || babaUser.id
  const { year, month } = period
  const date = `${year}-${month + 1}-01`
  const wallet = getWallet(finances, date)
  const years = Array.from(new Set([...wallet.years, getYear(currentDate)]))
  const filteredFinances = [...wallet.expensesInMonth, ...wallet.incomesInMonth]
  const payments = getPayments(filteredFinances)

  const {
    data: membersData,
    isError: isMembersError,
    isPending: membersIsPending
  } = useQueryMembers(id)
  const {
    data: financesData,
    isError: isFinancesError,
    isPending: financesIsPending,
    refetch
  } = useQueryFinances(id)

  const {
    mutate: mutateCreate,
    data: mutateDataCreate,
    isError: isCreateError,
    isPending: createIsPending
  } = useMutationCreateFinance()
  const {
    mutate: mutateCreateFinances,
    data: mutateDataCreateFinances,
    isError: isCreateFinancesError,
    isPending: createFinancesIsPending
  } = useMutationCreateFinances()
  const {
    mutate: mutateUpdate,
    data: mutateDataUpdate,
    isError: isUpdateError,
    isPending: updateIsPending
  } = useMutationUpdateFinance()
  const {
    mutate: mutateDelete,
    data: mutateDataDelete,
    isError: isDeleteError,
    isPending: deleteIsPending
  } = useMutationDeleteFinance()

  const { alert, setAlert, alertIsOpened, handleCloseAlert } = useAlert()
  const {
    modalIsOpened,
    handleOpenModal,
    handleCloseModal: closeModal
  } = useModal()
  const { dialog, dialogIsOpened, setDialog, handleCloseDialog } = useDialog()

  const description =
    'Verifique sua conexão com a internet ou atualize a página'

  useEffect(() => {
    if (membersData && financesData) {
      setMembers(membersData)
      setFinances(financesData)
    }
  }, [membersData, financesData])

  useEffect(() => {
    if (!isMembersError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar os membros',
      description
    })
  }, [isMembersError])

  useEffect(() => {
    if (!isFinancesError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar as finanças',
      description
    })
  }, [isFinancesError])

  useEffect(() => {
    if (!isCreateError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível criar a finança',
      description
    })
  }, [isCreateError])

  useEffect(() => {
    if (!isCreateFinancesError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível criar as finanças',
      description
    })
  }, [isCreateFinancesError])

  useEffect(() => {
    if (!isUpdateError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível atualizar a finança',
      description
    })
  }, [isUpdateError])

  useEffect(() => {
    if (!isDeleteError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível excluir a finança',
      description
    })
  }, [isDeleteError])

  useEffect(() => {
    if (!mutateDataCreate) return
    setAlert({
      severity: 'info',
      title: 'Finança criada com sucesso!',
      autoHide: true
    })
    setFinances((finances) => [...finances, mutateDataCreate])
    const { date } = mutateDataCreate
    setPeriod({
      year: getYear(date),
      month: getMonth(date)
    })
    handleCloseModal()
  }, [mutateDataCreate])

  useEffect(() => {
    if (!mutateDataCreateFinances) return
    setAlert({
      severity: 'info',
      title: 'Finanças criadas com sucesso!',
      autoHide: true
    })
    refetch()
    const { date } = mutateDataCreateFinances[0]
    setPeriod({
      year: getYear(date),
      month: getMonth(date)
    })
    handleCloseModal()
  }, [mutateDataCreateFinances])

  useEffect(() => {
    if (!mutateDataUpdate) return
    setAlert({
      severity: 'info',
      title: 'Finança editada com sucesso!',
      autoHide: true
    })
    setFinances((finances) =>
      finances.map((finance) =>
        finance.id !== mutateDataUpdate.id ? finance : mutateDataUpdate
      )
    )
    const { date } = mutateDataUpdate
    setPeriod({
      year: getYear(date),
      month: getMonth(date)
    })
    handleCloseModal()
  }, [mutateDataUpdate])

  useEffect(() => {
    if (!mutateDataDelete) return
    setAlert({
      severity: 'info',
      title: 'Finança excluída com sucesso!',
      autoHide: true
    })
    setFinances((finances) =>
      finances.filter((finance) => finance.id !== mutateDataDelete)
    )
    handleCloseModal()
  }, [mutateDataDelete])

  const handlePeriodChange = (e: SelectChangeEvent) => {
    setPeriod((period) => ({
      ...period,
      [e.target.name]: e.target.value
    }))
  }

  const handleFinanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'type') {
      setFinance((finance) => ({
        ...finance,
        type: value as '+' | '-',
        description: ''
      }))
      setCheckedMembers([])
      return
    }
    if (name === 'date') {
      setPeriod({
        year: getYear(value),
        month: getMonth(value)
      })
    }
    setFinance((finance) => ({
      ...finance,
      [name]: value
    }))
  }

  const handleCheckedMembersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value
    const isChecked = e.target.checked
    const checked = isChecked
      ? [...checkedMembers, id]
      : checkedMembers.filter((_id) => _id !== id)
    setCheckedMembers(checked)
    const getDescription = () => {
      switch (checked.length) {
        case 0:
          return ''
        case 1:
          return `Pagamento de ${getMemberById(members, id)?.name}`
        case 2:
          return `Pagamento de ${
            getMemberById(members, id)?.name
          } e um outro membro`
        default:
          return `Pagamento de ${
            getMemberById(members, finance.memberId || checked[0])?.name
          } e outros ${checked.length - 1} membros`
      }
    }
    setFinance((finance) => ({
      ...finance,
      description: getDescription()
    }))
  }

  const handleDateChange = (e: Dayjs | null) => {
    if (e === null) return
    const date = e.format('YYYY-MM-DD')
    setFinance((finance) => ({
      ...finance,
      date
    }))
  }

  const handleCloseModal = () => {
    setFinance(defaultFinanceState)
    setCheckedMembers([])
    closeModal()
  }

  const handleOpenModalUpdate = (finance: TFinance) => {
    if (!user) return
    setFinance(finance)
    finance.memberId && setCheckedMembers([finance.memberId])
    handleOpenModal()
  }

  const handleOpenDialogDelete = () => {
    setDialog(`Deseja realmente excluir?`)
  }

  const handleDelete = () => {
    if (!finance.id) {
      setAlert({
        severity: 'error',
        title: `Não foi possível excluir!`,
        description: description
      })
      return
    }
    handleCloseDialog()
    mutateDelete(finance.id)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data: TFinance = {
      ...finance,
      userId: user?.uid as string
    }
    const mutate = !data.id ? mutateCreate : mutateUpdate
    if (checkedMembers.length === 0) {
      mutate(data)
      return
    }
    if (checkedMembers.length === 1) {
      mutate({ ...data, memberId: checkedMembers[0] })
      return
    }
    mutateCreateFinances(
      checkedMembers.map((id) => ({
        ...data,
        memberId: id,
        description: `Pagamento de ${getMemberById(members, id)?.name}`
      }))
    )
  }

  const formProps: TFormProps = {
    isOpened: modalIsOpened,
    title: !finance.id ? 'Adicionar Finança' : 'Editar Finança',
    finance,
    finances: payments,
    members,
    checkedMembers,
    handleChange: handleFinanceChange,
    handleDateChange,
    handleCheckedMembersChange,
    handleClose: handleCloseModal,
    handleDelete: handleOpenDialogDelete,
    handleSubmit
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
    financesIsPending ||
    createIsPending ||
    createFinancesIsPending ||
    updateIsPending ||
    deleteIsPending

  return {
    user,
    year,
    month,
    wallet,
    handlePeriodChange,
    years,
    finances: filteredFinances,
    formProps,
    handleOpenModal,
    handleOpenModalUpdate,
    alertProps,
    dialogProps,
    isPending
  }
}
