import { ChangeEvent, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { useModal } from '@/hooks'
import { TBaba } from '@/types'

export const useComponentHandler = ({
  baba: b,
  isOpened
}: {
  baba: TBaba
  isOpened: boolean
}) => {
  const [member, setMember] = useState<[string, string | undefined]>(['', ''])
  const [baba, setBaba] = useState<TBaba>(b)
  const [teamIndex, setTeamIndex] = useState(0)

  const { modalIsOpened, handleOpenModal, handleCloseModal } = useModal()

  useEffect(() => {
    setBaba(b)
  }, [isOpened])

  const handleDateChange = (e: Dayjs | null) => {
    if (e === null || !baba) return
    const date = e.format('YYYY-MM-DD')
    setBaba({ ...baba, date })
  }

  const handleMemberClick = (id: string) => {
    setMember([id, id])
    handleOpenModal()
  }

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setMember((member) => {
      const [prevMember] = member
      const newMember = checked ? value : undefined
      return [prevMember, newMember]
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
    handleOpenModal()
  }

  const handleCloseMembersModal = () => {
    const [prevMember, newMember] = member
    const teams = baba.teams.map((team) => ({
      ...team,
      members: newMember
        ? team.members.map((m) =>
            m.memberId !== prevMember ? m : { ...m, memberId: newMember }
          )
        : team.members.filter(({ memberId }) => prevMember !== memberId)
    }))
    if (!prevMember && newMember)
      teams[teamIndex].members.push({ memberId: newMember, goals: 0 })
    setBaba({ ...baba, teams })
    handleCloseModal()
  }

  return {
    baba,
    member,
    handleDateChange,
    handleAddMemberClick,
    handleMemberClick,
    handleMemberChange,
    handleChange,
    modalIsOpened,
    handleCloseMembersModal
  }
}
