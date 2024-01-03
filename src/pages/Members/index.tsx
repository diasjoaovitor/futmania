import { Button, Typography } from '@mui/material'
import {
  Dialog,
  ExpandButton,
  Layout,
  MembersForm,
  MembersList
} from '@/shared/components'
import { useThemeContext } from '@/shared/contexts'
import { useLimit } from '@/shared/hooks'
import { separateMembers, sortMembersByName } from '@/shared/functions'
import { useMembers } from './useMembers'

export function Members() {
  const {
    theme: { palette }
  } = useThemeContext()

  const {
    user,
    membersFormProps,
    handleOpenModal,
    handleOpenModalUpdate,
    members,
    alertProps,
    dialogProps,
    isPending
  } = useMembers()

  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)

  const {
    limited: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembersByName(nonMembers), 5)

  return (
    <Layout title="Membros" isPending={isPending} alertProps={alertProps}>
      {members.length !== 0 ? (
        <>
          {fixedMembers.length !== 0 && (
            <MembersList
              title="Membros Fixos"
              members={sortMembersByName(fixedMembers)}
              color={palette.primary.main}
              handleClick={handleOpenModalUpdate}
            />
          )}
          {goalkeepers.length !== 0 && (
            <MembersList
              title="Goleiros"
              members={sortMembersByName(goalkeepers)}
              color={palette.secondary.main}
              handleClick={handleOpenModalUpdate}
            />
          )}
          {nonMembers.length !== 0 && (
            <>
              <MembersList
                title="Membros Avulsos"
                members={limitedNonMembers}
                color={palette.secondary.light}
                handleClick={handleOpenModalUpdate}
              />
              {nonMembers.length > 5 && (
                <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
              )}
            </>
          )}
        </>
      ) : (
        <Typography>Não há membros cadastrados</Typography>
      )}
      {user && (
        <>
          <Button sx={{ my: 2 }} variant="outlined" onClick={handleOpenModal}>
            Cadastrar Membros
          </Button>
          <MembersForm {...membersFormProps} />
          <Dialog {...dialogProps} />
        </>
      )}
    </Layout>
  )
}
