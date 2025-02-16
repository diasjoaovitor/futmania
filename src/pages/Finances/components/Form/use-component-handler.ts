import { yupResolver } from '@hookform/resolvers/yup'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'

import { useAppContext, useCallbackContext, useDialogContext } from '@/contexts'
import { TFinanceModel, TFinanceType } from '@/models'
import { TParamsCreate } from '@/types'
import { getCurrentDate, getMemberById } from '@/utils'

import { schema, TFormData } from './schema'
import {
  formatCurrencyMask,
  formatCurrencyToNumber,
  getColor,
  TColor
} from './utils'

export const useComponentHandler = ({
  finance,
  isOpened,
  handleClose
}: {
  finance: TFinanceModel | null
  isOpened: boolean
  handleClose(): void
}) => {
  const {
    userId,
    members,
    finances,
    financeMutationCreateMutate,
    financeMutationCreateManyMutate,
    financeMutationUpdateMutate,
    financeMutationDeleteMutate
  } = useAppContext()

  const defaultValues: TFormData = useMemo(
    () => ({
      date: finance?.date ?? getCurrentDate(),
      description: finance?.description ?? '',
      value: formatCurrencyMask(finance?.value || 0),
      type: finance?.type ?? '-'
    }),
    [finance]
  )

  const [checkedMembers, setCheckedMembers] = useState<string[]>([])
  const [isCheckListModalOpen, setIsCheckListModalOpen] = useState(false)
  const [color, setColor] = useState<TColor>(getColor(defaultValues.type))

  const dialog = useDialogContext()
  const { setSuccessCallbacks, setErrorCallbacks } = useCallbackContext()

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  const { reset } = form

  useEffect(() => {
    reset(defaultValues)
    setColor(getColor(defaultValues.type))
  }, [isOpened, defaultValues, reset])

  const handleTypeChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TFormData, 'type'>
  ) => {
    setColor(getColor(e.target.value as TFinanceType))
    field.onChange(e)
    form.setValue('description', '')
    setCheckedMembers([])
  }

  const handleCheckedMembersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value
    const isChecked = e.target.checked
    const checked = isChecked
      ? [...checkedMembers, id]
      : checkedMembers.filter((_id) => _id !== id)
    setCheckedMembers(checked)
    const member = getMemberById(members, id)?.name
    switch (checked.length) {
      case 0:
        return
      case 1:
        form.setValue('description', `Pagamento de ${member}`)
        return
      case 2:
        form.setValue(
          'description',
          `Pagamento de ${getMemberById(members, id)?.name} e um outro membro`
        )
        return
      default:
        form.setValue(
          'description',
          `Pagamento de ${
            getMemberById(members, finance?.memberId || checked[0])?.name
          } e outros ${checked.length - 1} membros`
        )
    }
  }

  const handleDelete = () => {
    if (!finance) return
    setSuccessCallbacks([dialog.close, handleClose])
    setErrorCallbacks([dialog.close])
    financeMutationDeleteMutate(finance.id)
  }

  const handleDialogOpen = () => {
    dialog.show({
      title: `Deseja realmente excluir?`,
      handleAccept: handleDelete
    })
  }

  const handleSubmit = (formData: TFormData) => {
    setSuccessCallbacks([handleClose])
    const data: TParamsCreate<TFinanceModel> = {
      ...formData,
      value: formatCurrencyToNumber(formData.value),
      userId: userId as string
    }
    if (checkedMembers.length === 0) {
      !finance?.id
        ? financeMutationCreateMutate(data)
        : financeMutationUpdateMutate({ ...finance, ...data })
      return
    }
    if (checkedMembers.length === 1) {
      financeMutationCreateMutate({ ...data, memberId: checkedMembers[0] })
      return
    }
    financeMutationCreateManyMutate(
      checkedMembers.map((id) => ({
        ...data,
        memberId: id,
        description: `Pagamento de ${getMemberById(members, id)?.name}`
      }))
    )
  }

  return {
    members,
    finances,
    color,
    form,
    checkedMembers,
    isCheckListModalOpen,
    setIsCheckListModalOpen,
    handleTypeChange,
    handleCheckedMembersChange,
    handleDialogOpen,
    handleSubmit
  }
}
