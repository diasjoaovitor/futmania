import { Box, Button, Divider } from '@mui/material'

import { Alert, Dialog, ExpandButton, Layout, Loader } from '@/components'
import { useLimit } from '@/hooks'

import { Form, List, Wallet, YearMonthSelect } from './components'
import { useComponentHandler } from './use-component-handler'
import { sortFinances } from './utils'

export const Finances = () => {
  const {
    user,
    year,
    month,
    wallet,
    handlePeriodChange,
    years,
    finances,
    formProps,
    handleOpenModal,
    handleOpenModalUpdate,
    alertProps,
    dialogProps,
    isPending
  } = useComponentHandler()

  const { limited, isFull, handleLimit } = useLimit(sortFinances(finances), 10)

  return (
    <Layout title="Finanças">
      <Box maxWidth={900}>
        <YearMonthSelect
          year={year}
          month={month}
          years={years}
          handleChange={handlePeriodChange}
        />
        <Divider sx={{ my: 2 }} />
        <Wallet
          balance={wallet.balance}
          expenses={wallet.totalExpensesInMonth}
          incomes={wallet.totalIncomesInMonth}
        />
        <Divider sx={{ my: 2 }} />
        <List finances={limited} handleClick={handleOpenModalUpdate} />
        {finances.length > 10 && (
          <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
        )}
        {user && (
          <>
            <Button sx={{ my: 2 }} variant="outlined" onClick={handleOpenModal}>
              Adicionar Finanças
            </Button>
            <Form {...formProps} />
            <Dialog {...dialogProps} />
          </>
        )}
      </Box>
      <Loader open={isPending} />
      <Alert {...alertProps} />
    </Layout>
  )
}
