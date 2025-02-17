import { useState } from 'react'

import { useAppContext } from '@/contexts'
import { TMemberModel } from '@/models'

import { TFormProps } from './components'

export const useComponentHandler = () => {
  const { members, babas, finances, isAuthenticatedInTheSelectedBaba } =
    useAppContext()

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [member, setMember] = useState<TMemberModel | null>(null)

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
    formProps,
    isStatsModalOpen,
    handleMemberClick,
    setIsStatsModalOpen,
    setIsFormModalOpen
  }
}
