import { useState } from 'react'

export function useModal() {
  const [modalIsOpened, setModalIsOpened] = useState(false)

  const handleOpenModal = () => setModalIsOpened(true)

  const handleCloseModal = () => setModalIsOpened(false)

  return {
    modalIsOpened,
    handleOpenModal,
    handleCloseModal
  }
}
