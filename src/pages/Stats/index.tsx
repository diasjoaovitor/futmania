import { Box, Typography } from '@mui/material'
import { Alert, Layout, Loader, MemberModal } from '@/components'
import { Ranking, SelectSeason } from './components'
import { useComponentHandler } from './use-component-handler'
import * as S from './styles'

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
        <SelectSeason
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
            <MemberModal {...memberModalProps} />
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
