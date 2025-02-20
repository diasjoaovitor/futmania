import { Box, Button, Typography } from '@mui/material'

import { Layout, MemberStatsModal } from '@/components'

import {
  BabaForm,
  Leaderboard,
  TeamsForm,
  YearMonthDaySelect
} from './components'
import * as S from './styles'
import { useComponentHandler } from './use-component-handler'

export const Babas = () => {
  const {
    isAuthenticatedInTheSelectedBaba,
    yearMonthDaySelectProps,
    baba,
    members,
    memberStatsModalProps,
    handleMemberStatsModalOpen,
    setTeamsFormModal,
    babaFormProps,
    setBabaFormModal,
    handleBabaDelete,
    teamsFormProps
  } = useComponentHandler()

  return (
    <Layout title="Babas">
      <Box sx={S.Wrapper}>
        <YearMonthDaySelect {...yearMonthDaySelectProps} />
      </Box>
      {baba ? (
        <>
          <Leaderboard
            baba={baba}
            members={members}
            handleClick={handleMemberStatsModalOpen}
          />
          <MemberStatsModal {...memberStatsModalProps} />
        </>
      ) : (
        <Typography sx={{ my: 4 }}>
          Não existe nenhum Baba nesta data
        </Typography>
      )}
      {isAuthenticatedInTheSelectedBaba && (
        <>
          <Box sx={S.ButtonsGrid}>
            <Button variant="outlined" onClick={() => setTeamsFormModal(true)}>
              Novo Baba
            </Button>
            {baba && (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setBabaFormModal(true)}
                >
                  Editar Baba
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleBabaDelete}
                >
                  Excluir Baba
                </Button>
                <BabaForm {...babaFormProps} baba={baba} />
              </>
            )}
          </Box>
          <TeamsForm {...teamsFormProps} />
        </>
      )}
    </Layout>
  )
}
