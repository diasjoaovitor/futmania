import { Button, Typography } from '@mui/material'

import { ExpandButton, Layout, MemberStatsModal } from '@/components'
import { useLimit } from '@/hooks'
import { getMemberStats, separateMembers, sortMembersByName } from '@/utils'

import { Form, List } from './components'
import { useComponentHandler } from './use-component-handler'

const min = 5

export const Members = () => {
  const {
    isAuthenticatedInTheSelectedBaba,
    member,
    members,
    babas,
    finances,
    formProps,
    isStatsModalOpen,
    handleMemberClick,
    setIsStatsModalOpen,
    setIsFormModalOpen
  } = useComponentHandler()

  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)

  const { limited, isFull, handleLimit } = useLimit(
    sortMembersByName(nonMembers),
    min
  )

  return (
    <Layout title="Membros">
      {members.length ? (
        <>
          {fixedMembers.length > 0 && (
            <List
              title="Membros Fixos"
              members={sortMembersByName(fixedMembers)}
              finances={finances}
              babas={babas}
              color="primary.main"
              handleClick={handleMemberClick}
            />
          )}
          {goalkeepers.length !== 0 && (
            <List
              title="Goleiros"
              members={sortMembersByName(goalkeepers)}
              finances={finances}
              babas={babas}
              color="secondary.main"
              handleClick={handleMemberClick}
            />
          )}
          {nonMembers.length !== 0 && (
            <div data-testid="teste-123">
              <List
                title="Membros Avulsos"
                members={limited}
                finances={finances}
                babas={babas}
                color="secondary.light"
                handleClick={handleMemberClick}
              />
              {nonMembers.length > min && (
                <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
              )}
            </div>
          )}
        </>
      ) : (
        <Typography>Não há membros cadastrados</Typography>
      )}
      {member && (
        <MemberStatsModal
          isOpened={isStatsModalOpen}
          member={member}
          finances={finances}
          handleClose={() => setIsStatsModalOpen(false)}
          stats={getMemberStats(babas, member.id)}
        />
      )}
      {isAuthenticatedInTheSelectedBaba && (
        <>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            onClick={() => setIsFormModalOpen(true)}
          >
            Cadastrar Membros
          </Button>
          <Form {...formProps} />
        </>
      )}
    </Layout>
  )
}
