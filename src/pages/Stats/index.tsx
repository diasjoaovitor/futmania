import { Typography } from '@mui/material'

import { Layout, MemberStatsModal } from '@/components'

import { Content, SelectSeason } from './components'
import { useComponentHandler } from './use-component-handler'

export const Stats = () => {
  const {
    finances,
    season,
    year,
    years,
    statsInSeason,
    member,
    memberStats,
    isStatsModalOpen,
    handleMemberClick,
    handleYearChange,
    handleSeasonChange,
    setIsStatsModalOpen
  } = useComponentHandler()

  return (
    <Layout title="Estatísticas">
      <SelectSeason
        season={season}
        year={year}
        years={years}
        handleYearChange={handleYearChange}
        handleSeasonChange={handleSeasonChange}
      />
      {statsInSeason.length > 0 ? (
        <>
          <Content stats={statsInSeason} handleClick={handleMemberClick} />
          {member && (
            <MemberStatsModal
              isOpened={isStatsModalOpen}
              member={member}
              finances={finances}
              handleClose={() => setIsStatsModalOpen(false)}
              stats={memberStats}
            />
          )}
        </>
      ) : (
        <Typography my={2}>Não há babas nessa temporada</Typography>
      )}
    </Layout>
  )
}
