import { invent } from '../searcher'
describe('searcher', () => {

    it('should invent simple input-output', () => {
        const result = invent(1, 1, 0, (executor) => {
            let score = 0
            if (executor([0])[0] == 0) {
                ++score
            }
            if (executor([1])[0] == 1) {
                ++score
            }
            return score
        }, 1000)
        expect(result).toBe(2)
    })
    it('should invent and', () => {
        const result = invent(2, 1, 0, (executor) => {
            let score = 0
            if (executor([0, 0])[0] == 0) {
                ++score
            }
            if (executor([1, 0])[0] == 0) {
                ++score
            }
            if (executor([0, 1])[0] == 0) {
                ++score
            }
            if (executor([1, 1])[0] == 1) {
                ++score
            }
            return score
        }, 2000)
        expect(result).toBe(4)
    })
})