import { Box, Typography } from '@mui/material'
import { Layout, MemberModal, MembersRanking, SelectSeason } from '@/components'
import { useStats } from './useStats'
import * as S from './style'

export function Stats() {
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
  } = useStats()

  return (
    <Box sx={S.Wrapper}>
      <Layout
        title="Estatísticas"
        isPending={isPending}
        alertProps={alertProps}
      >
        <SelectSeason
          season={season}
          year={year}
          years={years}
          handleChange={handlePeriodChange}
        />
        {statsInSeason.length > 0 ? (
          <>
            <MembersRanking
              stats={statsInSeason}
              handleClick={handleOpenMemberModal}
            />
            <MemberModal {...memberModalProps} />
          </>
        ) : (
          <Typography my={2}>Não há babas nessa temporada</Typography>
        )}
      </Layout>
    </Box>
  )
}
