import {
  Box,
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'

import { TBabaModel, TFinanceModel, TMemberModel } from '@/models'
import * as GS from '@/styles'
import {
  getMemberPayments,
  getMemberStats,
  getPaymentsData,
  isNotPaid
} from '@/utils'

type TListProps = {
  title: string
  members: TMemberModel[]
  babas: TBabaModel[]
  finances: TFinanceModel[]
  color: string
  handleClick(member: TMemberModel): void
}

export const List = ({
  title,
  members,
  babas,
  finances,
  color,
  handleClick
}: TListProps) => {
  return (
    <Box>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      <MuiList>
        {members.map((member, index) => {
          const stats = getMemberStats(babas, member.id)
          const payments = getMemberPayments(finances, member.id)
          const data = getPaymentsData(stats.frequency, payments)

          const isPaid = !isNotPaid(data)

          return (
            <ListItem
              key={member.id}
              sx={{ ...GS.Li(isPaid ? color : 'error.main'), pl: 0 }}
            >
              <ListItemButton onClick={() => handleClick(member)}>
                <ListItemText
                  secondary={
                    isPaid ? (
                      ''
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Pagamento pendente
                      </Typography>
                    )
                  }
                  primary={`${index + 1} - ${member.name}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </MuiList>
    </Box>
  )
}
