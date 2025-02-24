import { drawTeams } from './utils'

const ids = Array.from(new Array(25)).map((_, index) => index.toString())

describe('drawTeams', () => {
  it('should correctly distribute members into teams with the expected sizes', () => {
    Array.from(new Array(10)).forEach(() => {
      const result1 = drawTeams([], ids.slice(0, 8), 4)
      result1.forEach((team) => {
        expect(team.members).toHaveLength(2)
      })

      const result2 = drawTeams(result1, ids.slice(8, 12), 4)
      result2.forEach((team) => {
        expect(team.members).toHaveLength(3)
      })

      const result3 = drawTeams(result2, ids.slice(12, 15), 4)
      expect(result3[0].members).toHaveLength(4)
      expect(result3[1].members).toHaveLength(4)
      expect(result3[2].members).toHaveLength(4)
      expect(result3[3].members).toHaveLength(3)

      const result4 = drawTeams(result3, ids.slice(15, 17), 4)
      expect(result4[0].members).toHaveLength(5)
      expect(result4[1].members).toHaveLength(4)
      expect(result4[2].members).toHaveLength(4)
      expect(result4[3].members).toHaveLength(4)

      const result5 = drawTeams(result4, ids.slice(17, 18), 4)
      expect(result5[0].members).toHaveLength(5)
      expect(result5[1].members).toHaveLength(5)
      expect(result5[2].members).toHaveLength(4)
      expect(result5[3].members).toHaveLength(4)

      const result6 = drawTeams(result5, ids.slice(18, 25), 4)
      expect(result6[0].members).toHaveLength(7)
      expect(result6[1].members).toHaveLength(6)
      expect(result6[2].members).toHaveLength(6)
      expect(result6[3].members).toHaveLength(6)
    })
  })
})
