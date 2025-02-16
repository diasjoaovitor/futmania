import { Button, Divider } from '@mui/material'

import { ExpandButton, Layout } from '@/components'
import { useLimit } from '@/hooks'

import { Form, List, Wallet, YearMonthSelect } from './components'
import { useComponentHandler } from './use-component-handler'
import { sortFinances } from './utils'

export const Finances = () => {
  const {
    isAuthenticatedInTheSelectedBaba,
    wallet,
    formProps,
    yearMonthSelectProps,
    setIsFormModalOpen,
    handleFinanceClick
  } = useComponentHandler()

  const finances = [...wallet.expensesInMonth, ...wallet.incomesInMonth]

  const { limited, isFull, handleLimit } = useLimit(sortFinances(finances), 10)

  return (
    <Layout title="Finanças">
      <YearMonthSelect {...yearMonthSelectProps} />
      <Divider sx={{ my: 2 }} />
      <Wallet
        balance={wallet.balance}
        expenses={wallet.totalExpensesInMonth}
        incomes={wallet.totalIncomesInMonth}
      />
      <Divider sx={{ my: 2 }} />
      <List finances={limited} handleClick={handleFinanceClick} />
      {finances.length > 10 && (
        <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
      )}
      {isAuthenticatedInTheSelectedBaba && (
        <>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            onClick={() => setIsFormModalOpen(true)}
          >
            Adicionar Finanças
          </Button>
          <Form {...formProps} />
        </>
      )}
    </Layout>
  )
}
