import { Box, Button, Divider } from '@mui/material'
import {
  Dialog,
  ExpandButton,
  FinancesForm,
  FinancesList,
  Layout,
  SelectYearMonth,
  Wallet
} from '@/components'
import { useLimit } from '@/hooks'
import { useFinances } from './useFinances'
import { sortFinances } from './functions'

export function Finances() {
  const {
    user,
    year,
    month,
    wallet,
    handlePeriodChange,
    years,
    finances,
    financesFormProps,
    handleOpenModal,
    handleOpenModalUpdate,
    alertProps,
    dialogProps,
    isPending
  } = useFinances()

  const { limited, isFull, handleLimit } = useLimit(sortFinances(finances), 10)

  return (
    <Layout title="Finanças" alertProps={alertProps} isPending={isPending}>
      <Box maxWidth={900}>
        <SelectYearMonth
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
        <FinancesList finances={limited} handleClick={handleOpenModalUpdate} />
        {finances.length > 10 && (
          <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
        )}
        {user && (
          <>
            <Button sx={{ my: 2 }} variant="outlined" onClick={handleOpenModal}>
              Adicionar Finanças
            </Button>
            <FinancesForm {...financesFormProps} />
            <Dialog {...dialogProps} />
          </>
        )}
      </Box>
    </Layout>
  )
}
