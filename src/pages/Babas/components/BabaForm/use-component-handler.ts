import { Dayjs } from 'dayjs'
import { ChangeEvent, useEffect, useState } from 'react'

import { TBabaModel } from '@/models'

export function useBabaForm({
  baba: b,
  isOpened
}: {
  baba: TBabaModel
  isOpened: boolean
}) {
  const [selectedMembers, setSelectedMembers] = useState<
    [string, string | null]
  >(['', ''])
  const [baba, setBaba] = useState<TBabaModel>(b)
  const [teamIndex, setTeamIndex] = useState(0)
  const [modalIsOpened, setModalIsOpened] = useState(false)

  useEffect(() => {
    setBaba(b)
  }, [isOpened, b])

  const handleDateChange = (e: Dayjs | null) => {
    if (e === null || !baba) return
    const date = e.format('YYYY-MM-DD')
    setBaba({ ...baba, date })
  }

  const handleMemberClick = (id: string) => {
    setSelectedMembers([id, id])
    setModalIsOpened(true)
  }

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setSelectedMembers(([prevMemberId]) => {
      const newMemberId = checked ? value : null
      return [prevMemberId, newMemberId]
    })
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    teamIndex: number,
    memberIndex: number | null
  ) => {
    if (!baba) return
    const value = Number(e.currentTarget.value)
    if (memberIndex !== null) {
      setBaba({
        ...baba,
        teams: baba.teams.map((team, index) => {
          if (index !== teamIndex) return team
          return {
            ...team,
            members: team.members.map((member, index) => {
              if (index !== memberIndex) return member
              return {
                ...member,
                goals: value
              }
            })
          }
        })
      })
      return
    }
    setBaba({
      ...baba,
      teams: baba.teams.map((team, index) => {
        if (index !== teamIndex) return team
        return {
          ...team,
          [e.currentTarget.name]: value
        }
      })
    })
  }

  const handleAddMemberClick = (team: number) => {
    setTeamIndex(team)
    setModalIsOpened(true)
  }

  const handleMembersModalClose = () => {
    const [prevMemberId, newMemberId] = selectedMembers
    const teams = baba.teams.map((team) => ({
      ...team,
      members: newMemberId
        ? team.members.map((m) =>
            m.memberId !== prevMemberId ? m : { ...m, memberId: newMemberId }
          )
        : team.members.filter(({ memberId }) => prevMemberId !== memberId)
    }))
    if (!prevMemberId && newMemberId)
      teams[teamIndex].members.push({ memberId: newMemberId, goals: 0 })
    setBaba({ ...baba, teams })
    setModalIsOpened(false)
  }

  return {
    baba,
    selectedMembers,
    modalIsOpened,
    handleDateChange,
    handleAddMemberClick,
    handleMemberClick,
    handleMemberChange,
    handleChange,
    handleMembersModalClose
  }
}
