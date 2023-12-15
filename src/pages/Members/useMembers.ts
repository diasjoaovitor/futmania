import { FormEvent, useEffect, useState } from 'react'
import { AlertProps, DialogProps, MembersFormProps } from '@/shared/components'
import { useAuthContext } from '@/shared/contexts'
import {
  useMutationCreateMember,
  useMutationDeleteMember,
  useMutationUpdateMember,
  useQueriesMembersAndBabas
} from '@/shared/react-query'
import { useAlert, useDialog, useModal } from '@/shared/hooks'
import { TMember } from '@/shared/types'
import { createdAt } from '@/shared/states'
import { getElementValues, getElementsCheckedValues } from '@/shared/functions'
import { someBabaIncludesMember } from './functions'

export function useMembers() {
  const { user, babaUser } = useAuthContext()
  const [members, setMembers] = useState<TMember[]>([])
  const [member, setMember] = useState<TMember>({} as TMember)
  const id = user?.uid || babaUser.id

  const {
    membersData,
    membersIsPending,
    isMembersError,
    babasData,
    babasIsPending,
    isBabasError
  } = useQueriesMembersAndBabas(id)

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
    modalIsOpened,
    handleOpenModal,
    handleCloseModal: closeModal
  } = useModal()
  const { dialog, dialogIsOpened, setDialog, handleCloseDialog } = useDialog()

  const description =
    'Verifique sua conexão com a internet ou atualize a página'

  useEffect(() => {
    membersData && membersData.length > 0 && setMembers(membersData)
  }, [membersData])

  useEffect(() => {
    if (!isMembersError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar os membros',
      description
    })
  }, [isMembersError])

  useEffect(() => {
    if (!isBabasError) return
    setAlert({
      severity: 'error',
      title: 'Não foi possível buscar os dados',
      description
    })
  }, [isBabasError])

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
    handleCloseModal()
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
    handleCloseModal()
  }, [mutateDataDelete])

  const handleCloseModal = () => {
    setMember({} as TMember)
    closeModal()
  }

  const handleOpenModalUpdate = (member: TMember) => {
    if (!user) return
    setMember(member)
    handleOpenModal()
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
    const data: TMember = {
      name,
      isFixedMember,
      isGoalkeeper,
      createdAt,
      userId: user.uid
    }
    !member.id ? mutateCreate(data) : mutateUpdate(data)
  }

  const membersFormProps: MembersFormProps = {
    isOpened: modalIsOpened,
    title: !member.id ? 'Cadastrar Membros' : 'Editar Membro',
    member,
    handleClose: handleCloseModal,
    handleDelete: handleOpenDialogDelete,
    handleSubmit
  }

  const alertProps: AlertProps = {
    ...alert,
    isOpened: alertIsOpened,
    handleClose: handleCloseAlert
  }

  const dialogProps: DialogProps = {
    isOpened: dialogIsOpened,
    title: dialog,
    handleAccept: handleDelete,
    handleClose: handleCloseDialog
  }

  const isPending =
    membersIsPending ||
    babasIsPending ||
    createIsPending ||
    updateIsPending ||
    deleteIsPending

  return {
    membersFormProps,
    handleOpenModal,
    handleOpenModalUpdate,
    members,
    alertProps,
    dialogProps,
    isPending
  }
}
