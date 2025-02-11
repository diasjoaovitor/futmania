import { FormEvent, useEffect, useState } from 'react'
import { TAlertProps, TDialogProps, TMemberModalProps } from '@/components'
import { useAuthContext } from '@/contexts'
import {
  useMutationCreateMember,
  useMutationDeleteMember,
  useMutationUpdateMember,
  useQueriesMembersAndBabasAndFinances
} from '@/react-query'
import { useAlert, useDialog, useModal } from '@/hooks'
import { TBaba, TFinance, TMember } from '@/types'
import { createdAt } from '@/constants'
import {
  getElementValues,
  getElementsCheckedValues,
  getMemberStats
} from '@/utils'
import { someBabaIncludesMember } from './utils'
import { TFormProps } from './components'

export const useComponentHandler = () => {
  const { user, babaUser } = useAuthContext()
  const [finances, setFinances] = useState<TFinance[]>([])
  const [babas, setBabas] = useState<TBaba[]>([])
  const [members, setMembers] = useState<TMember[]>([])
  const [member, setMember] = useState<TMember>({} as TMember)
  const id = user?.uid || babaUser.id

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
  } = useMutationCreateMember()
  const {
    mutate: mutateUpdate,
    data: mutateDataUpdate,
    isError: isUpdateError,
    isPending: updateIsPending
  } = useMutationUpdateMember()
  const {
    mutate: mutateDelete,
    data: mutateDataDelete,
    isError: isDeleteError,
    isPending: deleteIsPending
  } = useMutationDeleteMember()

  const { alert, setAlert, alertIsOpened, handleCloseAlert } = useAlert()
  const {
    modalIsOpened: memberFormIsOpened,
    handleOpenModal: handleOpenMemberForm,
    handleCloseModal: handleCloseMemberFormModal
  } = useModal()
  const {
    modalIsOpened: memberStatsIsOpened,
    handleOpenModal: handleOpenMemberStats,
    handleCloseModal: handleCloseMemberStats
  } = useModal()
  const { dialog, dialogIsOpened, setDialog, handleCloseDialog } = useDialog()

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
      title: 'Não foi possível criar o membro',
      description
    })
  }, [isCreateError])

  useEffect(() => {
    if (!isUpdateError) return
    setAlert({
      severity: 'error',
      title: `Não foi possível atualizar os dados de ${member.name}`,
      description
    })
  }, [isUpdateError])

  useEffect(() => {
    if (!isDeleteError) return
    setAlert({
      severity: 'error',
      title: `Não foi possível excluir ${member.name}`,
      description
    })
  }, [isDeleteError])

  useEffect(() => {
    if (!mutateDataCreate) return
    setAlert({
      severity: 'info',
      title: 'Membro criado com sucesso!',
      autoHide: true
    })
    setMembers((members) => [...members, mutateDataCreate])
  }, [mutateDataCreate])

  useEffect(() => {
    if (!mutateDataUpdate) return
    setAlert({
      severity: 'info',
      title: 'Membro editado com sucesso!',
      autoHide: true
    })
    setMembers((members) =>
      members.map((member) =>
        member.id !== mutateDataUpdate.id ? member : mutateDataUpdate
      )
    )
    handleCloseMemberForm()
  }, [mutateDataUpdate])

  useEffect(() => {
    if (!mutateDataDelete) return
    setAlert({
      severity: 'info',
      title: 'Membro excluído com sucesso!',
      autoHide: true
    })
    setMembers((members) =>
      members.filter((member) => member.id !== mutateDataDelete)
    )
    handleCloseMemberForm()
  }, [mutateDataDelete])

  const handleCloseMemberForm = () => {
    setMember({} as TMember)
    handleCloseMemberFormModal()
  }

  const handleMemberClick = (member: TMember) => {
    setMember(member)
    !user ? handleOpenMemberStats() : handleOpenMemberForm()
  }

  const handleOpenDialogDelete = () => {
    setDialog(`Deseja realmente excluir ${member.name}?`)
  }

  const handleDelete = () => {
    if (!member.id || !babasData) {
      setAlert({
        severity: 'error',
        title: `Não foi possível excluir ${member.name}`,
        description: description
      })
      return
    }
    if (someBabaIncludesMember(member.id, babasData)) {
      setAlert({
        severity: 'error',
        title: 'Não foi possível excluir!',
        description: `${member.name} já está vinculado a um baba`
      })
      handleCloseDialog()
      return
    }
    handleCloseDialog()
    mutateDelete(member.id)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [name] = getElementValues(e, ['name'])
    const [isGoalkeeper, isFixedMember] = getElementsCheckedValues(e, [
      'isGoalkeeper',
      'isFixedMember'
    ])
    if (
      !name ||
      typeof isGoalkeeper !== 'boolean' ||
      typeof isFixedMember !== 'boolean' ||
      !user
    )
      return
    const memberAlreadyExists = members.some(
      ({ name: _name, id }) =>
        name.toLowerCase() === _name.toLowerCase() && id !== member.id
    )
    if (memberAlreadyExists) {
      setAlert({
        severity: 'error',
        title: 'Não possível realizar a ação!',
        description: `Um membro de nome ${name} já existe`
      })
      return
    }
    const data: TMember = {
      name,
      isFixedMember,
      isGoalkeeper,
      createdAt,
      userId: user.uid
    }
    !member.id ? mutateCreate(data) : mutateUpdate({ ...data, id: member.id })
  }

  const formProps: TFormProps = {
    isOpened: memberFormIsOpened,
    title: !member.id ? 'Cadastrar Membros' : 'Editar Membro',
    member,
    handleClose: handleCloseMemberForm,
    handleOpenMemberStats: handleOpenMemberStats,
    handleDelete: handleOpenDialogDelete,
    handleSubmit
  }

  const memberStatsProps: TMemberModalProps = {
    isOpened: memberStatsIsOpened,
    finances,
    member,
    stats,
    handleClose: handleCloseMemberStats
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
    members,
    handleOpenMemberForm,
    handleMemberClick,
    formProps,
    memberStatsProps,
    alertProps,
    dialogProps,
    isPending
  }
}
