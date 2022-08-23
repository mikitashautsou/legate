
import { INPUT, OUTPUT, NOR, connect } from '../network'
import { execute } from '../executor'

describe('executor', () => {
    it('simple input-output', () => {
        const input = INPUT()
        const output = OUTPUT()
        connect(input, 0, output, 0)
        expect(execute([input], [output], [0])).toStrictEqual([0])
    })

    it('AND test', () => {
        const input1 = INPUT()
        const input2 = INPUT()
        const nor1 = NOR()
        const nor2 = NOR()
        const nor3 = NOR()
        const output = OUTPUT()

        connect(input1, 0, nor1, 0)
        connect(input1, 0, nor1, 1)

        connect(input2, 0, nor2, 0)
        connect(input2, 0, nor2, 1)


        connect(nor1, 0, nor3, 0)
        connect(nor2, 0, nor3, 1)

        connect(nor3, 0, output, 0)
        expect(execute([input1, input2], [output], [0, 0])).toStrictEqual([0])
        expect(execute([input1, input2], [output], [0, 1])).toStrictEqual([0])
        expect(execute([input1, input2], [output], [1, 0])).toStrictEqual([0])
        expect(execute([input1, input2], [output], [1, 1])).toStrictEqual([1])
    })
})