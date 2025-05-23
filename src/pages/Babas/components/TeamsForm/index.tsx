import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Link as MUILink,
  Switch,
  Typography
} from '@mui/material'
import dayjs from 'dayjs'
import { Link } from 'react-router'

import {
  DateInput,
  ExpandButton,
  InputWithButton,
  MembersCheckboxList,
  Modal
} from '@/components'
import { useAppContext, useCallbackContext } from '@/contexts'
import { useLimit } from '@/hooks'
import { TFinanceModel, TMemberModel } from '@/models'
import { handleFocus, separateMembers, sortMembersByName } from '@/utils'

import { TeamsModal } from './TeamsModal'
import { useComponentHandler } from './use-component-handler'

export type TTeamsFormProps = {
  isOpened: boolean
  members: TMemberModel[]
  finances: TFinanceModel[]
  handleClose(): void
}

export const TeamsForm = ({
  isOpened,
  finances,
  members,
  handleClose
}: TTeamsFormProps) => {
  const { babaMutationCreateMutate, babaUser } = useAppContext()
  const { setSuccessCallbacks } = useCallbackContext()

  const {
    date,
    handleDateChange,
    isPrizeDraw,
    handleIsPrizeDrawChange,
    checkedMembers,
    drawnMembers,
    handleChange,
    numberOfTeams,
    handleNumberOfTeamsChange,
    selectedTeam,
    handleSelectedTeamChange,
    teams,
    handleTeams,
    handleClear,
    modalIsOpened,
    setModalIsOpened
  } = useComponentHandler()

  const min = 10
  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)
  const {
    limited: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembersByName(nonMembers), min)

  const handleSubmit = () => {
    setSuccessCallbacks([handleClose, () => () => setModalIsOpened(false)])
    babaMutationCreateMutate({
      date,
      teams: teams.filter((team) => team.members.length),
      userId: babaUser!.id
    })
  }

  return (
    <Modal title="Montar Times" isOpened={isOpened} handleClose={handleClose}>
      <>
        {members.length !== 0 ? (
          <>
            <Box mt={4}>
              <DateInput
                label="Data"
                value={dayjs(date)}
                onChange={handleDateChange}
              />
              <FormControlLabel
                sx={{ display: 'block' }}
                control={
                  <Switch
                    checked={isPrizeDraw}
                    onChange={handleIsPrizeDrawChange}
                  />
                }
                label={isPrizeDraw ? 'Sorteio' : 'Atribuir'}
              />
            </Box>
            {fixedMembers.length > 0 && (
              <MembersCheckboxList
                title="Membros Fixos"
                checkedMembers={[...checkedMembers, ...drawnMembers]}
                finances={finances}
                handleChange={handleChange}
                members={sortMembersByName([...fixedMembers])}
                disabledMembers={drawnMembers}
              />
            )}
            {goalkeepers.length > 0 && (
              <MembersCheckboxList
                title="Goleiros"
                checkedMembers={[...checkedMembers, ...drawnMembers]}
                finances={finances}
                handleChange={handleChange}
                members={sortMembersByName([...goalkeepers])}
                disabledMembers={drawnMembers}
              />
            )}
            {nonMembers.length > 0 && (
              <MembersCheckboxList
                title="Membros Avulsos"
                checkedMembers={[...checkedMembers, ...drawnMembers]}
                finances={finances}
                handleChange={handleChange}
                members={sortMembersByName([...limitedNonMembers])}
                disabledMembers={drawnMembers}
              />
            )}
            {nonMembers.length > min && (
              <ExpandButton isExpanded={isFull} handleClick={handleLimit} />
            )}
            <Typography my={3}>
              Membros selecionados:{' '}
              {[...checkedMembers, ...drawnMembers].length}
            </Typography>
            <Box>
              {isPrizeDraw ? (
                <InputWithButton
                  inputProps={{
                    name: 'numberOfTeams',
                    type: 'number',
                    label: 'Quantidade de Times',
                    value: numberOfTeams,
                    onFocus: handleFocus,
                    onChange: handleNumberOfTeamsChange,
                    slotProps: {
                      htmlInput: {
                        min: 2,
                        max: members.length
                      }
                    },
                    disabled: drawnMembers.length > 0
                  }}
                  buttonProps={{
                    children: 'Sortear',
                    variant: 'contained',
                    onClick: handleTeams,
                    disabled: checkedMembers.length === 0
                  }}
                />
              ) : (
                <InputWithButton
                  inputProps={{
                    name: 'team',
                    type: 'number',
                    label: 'Time',
                    value: selectedTeam,
                    onFocus: handleFocus,
                    onChange: handleSelectedTeamChange,
                    slotProps: {
                      htmlInput: {
                        min: 1,
                        max: members.length
                      }
                    }
                  }}
                  buttonProps={{
                    children: 'Atribuir',
                    variant: 'contained',
                    onClick: handleTeams,
                    disabled: checkedMembers.length === 0
                  }}
                />
              )}
            </Box>
            {drawnMembers.length > 0 && (
              <Box mt={2}>
                <Button
                  sx={{ mr: 1 }}
                  variant="outlined"
                  onClick={() => setModalIsOpened(true)}
                >
                  Ver Times
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClear}
                >
                  Limpar Sorteio
                </Button>
              </Box>
            )}
            <TeamsModal
              teams={teams}
              members={members}
              isOpened={modalIsOpened && isOpened}
              handleClose={() => setModalIsOpened(false)}
              handleSubmit={handleSubmit}
            />
          </>
        ) : (
          <Typography>Não há membros cadastrados</Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <MUILink component={Link} to="/members">
          Cadastrar Membros
        </MUILink>
      </>
    </Modal>
  )
}
