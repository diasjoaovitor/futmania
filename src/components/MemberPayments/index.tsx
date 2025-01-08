import { useState } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import { TFinance } from '@/types'
import {
  TFrequency,
  formatCurrency,
  getMonthExtensiveYearNum
} from '@/functions'
import { getPayments, getPaymentsData } from './functions'
import { palette } from '@/themes'
import { ExpandButton } from '..'
import * as S from './style'

type Props = {
  memberId: string
  frequency: TFrequency[]
  finances: TFinance[]
}

export function MemberPayments({ memberId, frequency, finances }: Props) {
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
                    sx={{ ...S.PaymentItem, borderColor: palette.gray }}
                    data-testid="payment-item"
                  >
                    {payment > 0 || exemptPayment ? <Check /> : <Close />}
                    <div>
                      <Typography variant="caption" color={palette.gray}>
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
