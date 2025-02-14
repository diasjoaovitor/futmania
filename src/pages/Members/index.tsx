import { Button, Typography } from '@mui/material'

import {
  Alert,
  Dialog,
  ExpandButton,
  Layout,
  Loader,
  MemberStatsModal
} from '@/components'
import { useLimit } from '@/hooks'
import { separateMembers, sortMembersByName } from '@/utils'

import { Form, List } from './components'
import { useComponentHandler } from './use-component-handler'

const min = 5

export const Members = () => {
  const {
    isAuthenticatedInTheSelectedBaba,
    members,
    handleOpenMemberForm,
    handleMemberClick,
    formProps,
    memberStatsProps,
    alertProps,
    dialogProps,
    isPending
  } = useComponentHandler()

  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)

  const {
    limited: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembersByName(nonMembers), min)

  return (
    <Layout title="Membros">
      {members.length !== 0 ? (
        <>
          {fixedMembers.length !== 0 && (
            <List
              title="Membros Fixos"
              members={sortMembersByName(fixedMembers)}
              color="primary.main"
              handleClick={handleMemberClick}
            />
          )}
          {goalkeepers.length !== 0 && (
            <List
              title="Goleiros"
              members={sortMembersByName(goalkeepers)}
              color="secondary.main"
              handleClick={handleMemberClick}
            />
          )}
          {nonMembers.length !== 0 && (
            <>
              <List
                title="Membros Avulsos"
                members={limitedNonMembers}
                color="secondary.light"
                handleClick={handleMemberClick}
              />
              {nonMembers.length > min && (
                <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
              )}
            </>
          )}
        </>
      ) : (
        <Typography>Não há membros cadastrados</Typography>
      )}
      <MemberStatsModal {...memberStatsProps} />
      {isAuthenticatedInTheSelectedBaba && (
        <>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            onClick={handleOpenMemberForm}
          >
            Cadastrar Membros
          </Button>
          <Form {...formProps} />
          <Dialog {...dialogProps} />
        </>
      )}
      <Loader open={isPending} />
      <Alert {...alertProps} />
    </Layout>
  )
}
