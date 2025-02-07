import { Button, Typography } from '@mui/material'

import { Layout, MemberStatsModal, ToggleExpandButton } from '@/components'
import { getMemberStats, sortMembersByName } from '@/utils'

import { Form, List } from './components'
import { useComponentHandler } from './use-component-handler'

export const Members = () => {
  const {
    isAuthenticatedInTheSelectedBaba,
    member,
    members,
    babas,
    finances,
    fixedMembers,
    goalkeepers,
    nonMembers,
    limited,
    min,
    isFull,
    formProps,
    isStatsModalOpen,
    handleLimit,
    handleMemberClick,
    setIsStatsModalOpen,
    setIsFormModalOpen
  } = useComponentHandler()
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
                <ToggleExpandButton
                  isExpanded={isFull}
                  handleClick={handleLimit}
                />
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
