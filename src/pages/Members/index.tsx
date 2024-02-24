import { Button, Typography } from '@mui/material'
import {
  Dialog,
  ExpandButton,
  Layout,
  MemberModal,
  MembersForm,
  MembersList
} from '@/shared/components'
import { useThemeContext } from '@/shared/contexts'
import { useLimit } from '@/shared/hooks'
import { separateMembers, sortMembersByName } from '@/shared/functions'
import { useMembers } from './useMembers'

const min = 5

export function Members() {
  const {
    theme: { palette }
  } = useThemeContext()

  const {
    user,
    members,
    handleOpenMemberForm,
    handleMemberClick,
    membersFormProps,
    memberStatsProps,
    alertProps,
    dialogProps,
    isPending
  } = useMembers()

  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)

  const {
    limited: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembersByName(nonMembers), min)

  return (
    <Layout title="Membros" isPending={isPending} alertProps={alertProps}>
      {members.length !== 0 ? (
        <>
          {fixedMembers.length !== 0 && (
            <MembersList
              title="Membros Fixos"
              members={sortMembersByName(fixedMembers)}
              color={palette.primary.main}
              handleClick={handleMemberClick}
            />
          )}
          {goalkeepers.length !== 0 && (
            <MembersList
              title="Goleiros"
              members={sortMembersByName(goalkeepers)}
              color={palette.secondary.main}
              handleClick={handleMemberClick}
            />
          )}
          {nonMembers.length !== 0 && (
            <>
              <MembersList
                title="Membros Avulsos"
                members={limitedNonMembers}
                color={palette.secondary.light}
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
      <MemberModal {...memberStatsProps} />
      {user && (
        <>
          <Button
            sx={{ my: 2 }}
            variant="outlined"
            onClick={handleOpenMemberForm}
          >
            Cadastrar Membros
          </Button>
          <MembersForm {...membersFormProps} />
          <Dialog {...dialogProps} />
        </>
      )}
    </Layout>
  )
}
