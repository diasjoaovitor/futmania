import { Box, Button, Typography } from '@mui/material'

import { Alert, Dialog, Layout, Loader, MemberStatsModal } from '@/components'

import { Form, Leaderboard, TeamsForm, YearMonthDaySelect } from './components'
import * as S from './styles'
import { useComponentHandler } from './use-component-handler'

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
            <MemberStatsModal {...memberModalProps} />
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
