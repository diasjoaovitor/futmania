import { useState } from 'react'

import { useAppContext } from '@/contexts'
import { useLimit } from '@/hooks'
import { TMemberModel } from '@/models'
import { separateMembers, sortMembersByName } from '@/utils'

import { TFormProps } from './components'

const min = 5

export const useComponentHandler = () => {
  const { members, babas, finances, isAuthenticatedInTheSelectedBaba } =
    useAppContext()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [member, setMember] = useState<TMemberModel | null>(null)

  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)

  const { limited, isFull, handleLimit } = useLimit(
    sortMembersByName(nonMembers),
    min
  )

  const handleMemberClick = (member: TMemberModel) => {
    setMember(member)
    !isAuthenticatedInTheSelectedBaba
      ? setIsStatsModalOpen(true)
      : setIsFormModalOpen(true)
  }

  const handleFormClose = () => {
    setMember(null)
    setIsFormModalOpen(false)
  }

  const formProps: TFormProps = {
    isOpened: isFormModalOpen,
    title: !member ? 'Cadastrar Membros' : 'Editar Membro',
    member,
    handleClose: handleFormClose,
    handleOpenMemberStats: () => setIsStatsModalOpen(true)
  }

  return {
    isAuthenticatedInTheSelectedBaba,
    member,
    members,
    babas,
    finances,
    fixedMembers,
    goalkeepers,
    nonMembers,
    limited,
    min,
    isFull,
    formProps,
    isStatsModalOpen,
    handleLimit,
    handleMemberClick,
    setIsStatsModalOpen,
    setIsFormModalOpen
  }
}
