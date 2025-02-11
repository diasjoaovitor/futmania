import { Check, Close } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material'
import { useState } from 'react'

import { TFinance } from '@/types'
import { formatCurrency, getMonthExtensiveYearNum, TFrequency } from '@/utils'

import { ExpandButton } from '..'
import * as S from './styles'
import { getPayments, getPaymentsData } from './utils'

type TPaymentsProps = {
  memberId: string
  frequency: TFrequency[]
  finances: TFinance[]
}

export const Payments = ({ memberId, frequency, finances }: TPaymentsProps) => {
  const payments = getPayments(finances, memberId)
  const data = getPaymentsData(frequency, payments)

  const isNotPaid = data.some(
    ({ exemptPayment, payment }) => !exemptPayment && !payment
  )

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <List>
      <ListSubheader sx={{ position: 'static' }}>Mensalidade</ListSubheader>
      {data.length > 0 ? (
        <>
          {!open ? (
            <ListItem>
              <ListItemButton
                onClick={handleOpen}
                sx={{ p: 0, textAlign: 'center', gap: 1, alignItems: 'center' }}
              >
                {!isNotPaid ? (
                  <>
                    <Check />
                    <Typography sx={{ position: 'relative', top: 2 }}>
                      Pagamento em dia!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Close />
                    <Typography sx={{ position: 'relative', top: 2 }}>
                      Pagamento pendente!
                    </Typography>
                  </>
                )}
              </ListItemButton>
            </ListItem>
          ) : (
            <>
              {data.map(({ babas, payment, yearMonth, exemptPayment }) => {
                return (
                  <ListItem
                    key={yearMonth}
                    sx={{ ...S.PaymentItem, borderColor: 'text.secondary' }}
                    data-testid="payment-item"
                  >
                    {payment > 0 || exemptPayment ? <Check /> : <Close />}
                    <div>
                      <Typography variant="caption" color="text.secondary">
                        {getMonthExtensiveYearNum(yearMonth)}
                      </Typography>
                      <Typography>Babas: {babas}</Typography>
                      <Typography>
                        Pagamento:{' '}
                        {!exemptPayment ? formatCurrency(payment) : 'Isento'}
                      </Typography>
                    </div>
                  </ListItem>
                )
              })}
            </>
          )}
          {open && (
            <ListItem disablePadding>
              <ExpandButton isExpanded={true} handleClick={handleClose} />
            </ListItem>
          )}
        </>
      ) : (
        <ListItem>
          <ListItemText primary={<Close />} />
        </ListItem>
      )}
    </List>
  )
}
