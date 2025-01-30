import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import {
  useAppContext,
  useCallbackContext,
  useDialogContext,
  useNotificationContext
} from '@/contexts'
import { TMemberModel } from '@/models'

import { schema, TFormData } from './schema'
import { memberAlreadyExists, someBabaIncludesMember } from './utils'

export const useComponentHandler = ({
  member,
  isOpened,
  handleClose
}: {
  member: TMemberModel | null
  isOpened: boolean
  handleClose(): void
}) => {
  const {
    babas,
    members,
    babaUser,
    memberMutationCreateMutate,
    memberMutationUpdateMutate,
    memberMutationDeleteMutate
  } = useAppContext()

  const dialog = useDialogContext()
  const notification = useNotificationContext()
  const { setSuccessCallbacks, setErrorCallbacks } = useCallbackContext()

  const defaultValues: TFormData = useMemo(
    () => ({
      name: member?.name || '',
      isFixedMember: !member ? true : member.isFixedMember,
      isGoalkeeper: !member ? false : member.isGoalkeeper
    }),
    [member]
  )
  const form = useForm({
    resolver: yupResolver(schema)
  })

  const { reset } = form

  useEffect(() => {
    reset(defaultValues)
  }, [isOpened, defaultValues, reset])

  const handleDelete = () => {
    if (!member) return
    if (someBabaIncludesMember(member.id, babas)) {
      dialog.close()
      notification({
        severity: 'error',
        title: 'Não foi possível excluir!',
        description: `${member.name} já está vinculado a um baba`
      })
      return
    }
    setSuccessCallbacks([dialog.close, handleClose])
    setErrorCallbacks([dialog.close])
    memberMutationDeleteMutate(member.id)
  }

  const handleDialogOpen = () => {
    dialog.show({
      title: `Deseja realmente excluir ${member?.name}?`,
      handleAccept: handleDelete
    })
  }

  const handleSubmit = (data: TFormData) => {
    if (memberAlreadyExists(data.name, members) && data.name !== member?.name) {
      notification({
        severity: 'error',
        title: 'Não possível adicionar!',
        description: `Um membro de nome ${data.name} já existe`
      })
      return
    }
    if (!member) {
      memberMutationCreateMutate({ ...data, userId: babaUser!.id })
    } else {
      setSuccessCallbacks([handleClose])
      memberMutationUpdateMutate({ ...member, ...data })
    }
  }

  return {
    defaultValues,
    form,
    handleDialogOpen,
    handleSubmit
  }
}
