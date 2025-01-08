import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Link as MUILink,
  Switch,
  Typography
} from '@mui/material'
import {
  ExpandButton,
  InputDate,
  InputWithButton,
  MembersCheckboxList,
  Modal,
  TeamsModal
} from '@/components'
import { handleFocus, separateMembers, sortMembersByName } from '@/functions'
import { TFinance, TMember, TTeam } from '@/types'
import { useLimit } from '@/hooks'
import { useTeamsForm } from './useTeamsForm'

export type TeamsFormProps = {
  isOpened: boolean
  members: TMember[]
  finances: TFinance[]
  handleClose(): void
  handleSubmit(teams: TTeam[], date: string): void
}

export function TeamsForm({
  isOpened,
  finances,
  members,
  handleClose,
  handleSubmit
}: TeamsFormProps) {
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
    handleOpenModal,
    handleCloseModal
  } = useTeamsForm()

  const min = 10
  const { fixedMembers, goalkeepers, nonMembers } = separateMembers(members)
  const {
    limited: limitedNonMembers,
    isFull,
    handleLimit
  } = useLimit(sortMembersByName(nonMembers), min)

  return (
    <Modal title="Montar Times" isOpened={isOpened} handleClose={handleClose}>
      <>
        {members.length !== 0 ? (
          <>
            <Box mt={4}>
              <InputDate date={date} handleChange={handleDateChange} />
              <FormControlLabel
                control={
                  <Switch
                    checked={isPrizeDraw}
                    onChange={handleIsPrizeDrawChange}
                  />
                }
                label={isPrizeDraw ? 'Sorteio' : 'Atribuir'}
              />
            </Box>
            <MembersCheckboxList
              title="Membros Fixos"
              checkedMembers={[...checkedMembers, ...drawnMembers]}
              finances={finances}
              handleChange={handleChange}
              members={sortMembersByName([...fixedMembers])}
              disabledMembers={drawnMembers}
            />
            <MembersCheckboxList
              title="Goleiros"
              checkedMembers={[...checkedMembers, ...drawnMembers]}
              finances={finances}
              handleChange={handleChange}
              members={sortMembersByName([...goalkeepers])}
              disabledMembers={drawnMembers}
            />
            <MembersCheckboxList
              title="Membros Avulsos"
              checkedMembers={[...checkedMembers, ...drawnMembers]}
              finances={finances}
              handleChange={handleChange}
              members={sortMembersByName([...limitedNonMembers])}
              disabledMembers={drawnMembers}
            />
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
                    type: 'number',
                    label: 'Quantidade de Times',
                    value: numberOfTeams,
                    onFocus: handleFocus,
                    onChange: handleNumberOfTeamsChange,
                    inputProps: { min: 2 },
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
                    type: 'number',
                    label: 'Time',
                    value: selectedTeam,
                    onFocus: handleFocus,
                    onChange: handleSelectedTeamChange,
                    inputProps: { min: 1 }
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
                  onClick={handleOpenModal}
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
              date={date}
              teams={teams}
              members={members}
              isOpened={modalIsOpened && isOpened}
              handleClose={handleCloseModal}
              handleSubmit={() => handleSubmit(teams, date)}
            />
          </>
        ) : (
          <Typography>Não há membros cadastrados</Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <MUILink component={Link} to="/membros">
          Cadastrar Membros
        </MUILink>
      </>
    </Modal>
  )
}
