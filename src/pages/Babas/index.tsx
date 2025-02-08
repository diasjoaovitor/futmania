import { Box, Button, Typography } from '@mui/material'
import {
  AlertProps,
  BabaForm,
  BabaLeaderboard,
  Dialog,
  Layout,
  MemberModal,
  SelectYearMonthDay,
  TeamsForm
} from '@/components'
import { useBabas } from './useBabas'
import * as S from './style'

export function Babas() {
  const {
    user,
    period,
    babaDates,
    handlePeriodChange,
    years,
    baba,
    members,
    handleOpenBabaModal,
    handleOpenTeamsModal,
    handleOpenMemberModal,
    handleOpenDialogDelete,
    babaFormProps,
    teamsFormProps,
    memberModalProps,
    alertProps,
    dialogProps,
    isPending
  } = useBabas()
  return (
    <Layout
      title="Babas"
      alertProps={alertProps as AlertProps}
      isPending={isPending}
    >
      <Box sx={S.Wrapper}>
        <SelectYearMonthDay
          {...period}
          years={years}
          dates={babaDates}
          handleChange={handlePeriodChange}
        />
        {baba ? (
          <>
            <BabaLeaderboard
              baba={baba}
              members={members}
              handleClick={handleOpenMemberModal}
            />
            <MemberModal {...memberModalProps} />
          </>
        ) : (
          <Typography my={2}>Não há baba nessa data</Typography>
        )}
        {user && (
          <>
            <Box sx={S.ButtonsGrid}>
              <Button variant="outlined" onClick={handleOpenTeamsModal}>
                Novo Baba
              </Button>
              {baba && (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleOpenBabaModal}
                  >
                    Editar Baba
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleOpenDialogDelete}
                  >
                    Excluir Baba
                  </Button>
                  <BabaForm {...babaFormProps} />
                </>
              )}
            </Box>
            <TeamsForm {...teamsFormProps} />
            <Dialog {...dialogProps} />
          </>
        )}
      </Box>
    </Layout>
  )
}
