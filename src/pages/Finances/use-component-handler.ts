import { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

import { useAppContext } from '@/contexts'
import { TFinanceModel } from '@/models'
import { getCurrentDate, getMonth, getYear, getYearMonth } from '@/utils'

import { TFormProps, TYearMonthSelectProps } from './components'
import { getWallet } from './utils'

const currentDate = getCurrentDate()

export const useComponentHandler = () => {
  const { finances, isAuthenticatedInTheSelectedBaba } = useAppContext()

  const [year, setYear] = useState(getYear(currentDate))
  const [month, setMonth] = useState(getMonth(currentDate))
  const [finance, setFinance] = useState<TFinanceModel | null>(null)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)

  const wallet = getWallet(finances, getYearMonth(`${year}-${month + 1}-01`))

  const handleYearChange = (e: SelectChangeEvent) => {
    setYear(Number(e.target.value))
  }

  const handleMonthChange = (e: SelectChangeEvent) => {
    setMonth(Number(e.target.value))
  }

  const handleFinanceClick = (member: TFinanceModel) => {
    setFinance(member)
    setIsFormModalOpen(true)
  }

  const handleFormClose = () => {
    setFinance(null)
    setIsFormModalOpen(false)
  }

  const formProps: TFormProps = {
    title: !finance?.id ? 'Adicionar Finança' : 'Editar Finança',
    finance,
    isOpened: isFormModalOpen,
    handleClose: handleFormClose
  }

  const yearMonthSelectProps: TYearMonthSelectProps = {
    month,
    year,
    years: wallet.years,
    handleMonthChange,
    handleYearChange
  }

  return {
    isAuthenticatedInTheSelectedBaba,
    wallet,
    formProps,
    yearMonthSelectProps,
    setIsFormModalOpen,
    handleFinanceClick
  }
}
