import { Box, Button, Typography } from '@mui/material'

import { Layout, MemberStatsModal } from '@/components'

import {
  BabaForm,
  BabaLeaderboard,
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
          <BabaLeaderboard
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

// import { Box, Button, Typography } from '@mui/material'
// import { BabaLeaderboard, Layout, MemberStatsModal } from '@/components'
// import { BabaForm, YearMonthDaySelect, TeamsForm } from './components'
// import { useBabas } from './use-component-handler'
// export function Babas() {
//   const {
//     user,
//     period,
//     babaDates,
//     handlePeriodChange,
//     years,
//     baba,
//     members,
//     handleOpenBabaModal,
//     handleOpenTeamsModal,
//     handleOpenMemberModal,
//     handleOpenDialogDelete,
//     babaFormProps,
//     teamsFormProps,
//     memberModalProps
//   } = useBabas()
//   return (
//     <Layout title="Babas">
//       <Box sx={S.Wrapper}>
//         <SelectYearMonthDay
//           {...period}
//           years={years}
//           dates={babaDates}
//           handleChange={handlePeriodChange}
//         />
//         {baba ? (
//           <>
//             <BabaLeaderboard
//               baba={baba}
//               members={members}
//               handleClick={handleOpenMemberModal}
//             />
//             {memberModalProps.stats && (
//               <MemberStatsModal {...memberModalProps} />
//             )}
//           </>
//         ) : (
//           <Typography my={2}>Não há baba nessa data</Typography>
//         )}
//         {user && (
//           <>
//             <Box sx={S.ButtonsGrid}>
//               <Button variant="outlined" onClick={handleOpenTeamsModal}>
//                 Novo Baba
//               </Button>
//               {baba && (
//                 <>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={handleOpenBabaModal}
//                   >
//                     Editar Baba
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={handleOpenDialogDelete}
//                   >
//                     Excluir Baba
//                   </Button>
//                   <BabaForm {...babaFormProps} />
//                 </>
//               )}
//             </Box>
//             <TeamsForm {...teamsFormProps} />
//           </>
//         )}
//       </Box>
//     </Layout>
//   )
// }
