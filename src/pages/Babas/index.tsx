import { Box, Button, Typography } from '@mui/material'
import { Dialog, Layout, MemberModal, Loader, Alert } from '@/components'
import { Leaderboard, YearMonthDaySelect, TeamsForm, Form } from './components'
import { useComponentHandler } from './use-component-handler'
import * as S from './styles'

export const Babas = () => {
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
    formProps,
    teamsFormProps,
    memberModalProps,
    alertProps,
    dialogProps,
    isPending
  } = useComponentHandler()
  return (
    <Layout title="Babas">
      <Box sx={S.Wrapper}>
        <YearMonthDaySelect
          {...period}
          years={years}
          dates={babaDates}
          handleChange={handlePeriodChange}
        />
        {baba ? (
          <>
            <Leaderboard
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
                  <Form {...formProps} />
                </>
              )}
            </Box>
            <TeamsForm {...teamsFormProps} />
            <Dialog {...dialogProps} />
          </>
        )}
      </Box>
      <Loader open={isPending} />
      <Alert {...alertProps} />
    </Layout>
  )
}
