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

import { TFinanceModel } from '@/models'
import {
  formatCurrency,
  getMemberPayments,
  getMonthExtensiveYearNum,
  getPaymentsData,
  isNotPaid,
  TFrequency
} from '@/utils'

import { ExpandButton } from '..'
import * as S from './styles'

type TPaymentProps = {
  memberId: string
  frequency: TFrequency[]
  finances: TFinanceModel[]
}

export const Payments = ({ memberId, frequency, finances }: TPaymentProps) => {
  const payments = getMemberPayments(finances, memberId)
  const data = getPaymentsData(frequency, payments)

  const isPaid = !isNotPaid(data)

  const [open, setOpen] = useState(false)

  return (
    <List>
      <ListSubheader sx={{ position: 'static' }}>Mensalidade</ListSubheader>
      {data.length > 0 ? (
        <>
          {!open ? (
            <ListItem>
              <ListItemButton
                onClick={() => setOpen(true)}
                sx={{ p: 0, textAlign: 'center', gap: 1, alignItems: 'center' }}
              >
                {isPaid ? (
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
              <ExpandButton
                isExpanded={true}
                handleClick={() => setOpen(false)}
              />
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
