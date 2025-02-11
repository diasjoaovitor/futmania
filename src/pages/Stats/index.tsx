import { Box, Typography } from '@mui/material'

import { Alert, Layout, Loader, MemberStatsModal } from '@/components'

import { Ranking, SeasonSelect } from './components'
import * as S from './styles'
import { useComponentHandler } from './use-component-handler'

export const Stats = () => {
  const {
    season,
    year,
    years,
    statsInSeason,
    handleOpenMemberModal,
    memberModalProps,
    handlePeriodChange,
    alertProps,
    isPending
  } = useComponentHandler()

  return (
    <Box sx={S.Wrapper}>
      <Layout title="Estatísticas">
        <SeasonSelect
          season={season}
          year={year}
          years={years}
          handleChange={handlePeriodChange}
        />
        {statsInSeason.length > 0 ? (
          <>
            <Ranking
              stats={statsInSeason}
              handleClick={handleOpenMemberModal}
            />
            <MemberStatsModal {...memberModalProps} />
          </>
        ) : (
          <Typography my={2}>Não há babas nessa temporada</Typography>
        )}
      </Layout>
      <Loader open={isPending} />
      <Alert {...alertProps} />
    </Box>
  )
}
