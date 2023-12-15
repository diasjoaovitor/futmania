import { Box, Button, Typography } from '@mui/material'
import {
  Dialog,
  ExpandButton,
  Layout,
  MembersForm,
  MembersList
} from '@/shared/components'
import { useAuthContext, useThemeContext } from '@/shared/contexts'
import { useLimit } from '@/shared/hooks'
import { separateMembers, sortMembers } from './functions'
import { useMembers } from './useMembers'
import * as S from './style'

export function Members() {
  const { user } = useAuthContext()
  const {
    theme: { palette }
  } = useThemeContext()

  const {
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
    array: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembers(nonMembers))

  return (
    <Box sx={S.Wrapper}>
      <Layout title="Membros" isPending={isPending} alertProps={alertProps}>
        {members.length !== 0 ? (
          <>
            {fixedMembers.length !== 0 && (
              <MembersList
                title="Membros Fixos"
                members={sortMembers(fixedMembers)}
                color={palette.primary.main}
                handleClick={handleOpenModalUpdate}
              />
            )}
            {goalkeepers.length !== 0 && (
              <MembersList
                title="Goleiros"
                members={sortMembers(goalkeepers)}
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
    </Box>
  )
}
