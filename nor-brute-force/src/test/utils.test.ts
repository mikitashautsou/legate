import { clone } from "../utils"

describe('utils', () => {

    it('should clone', () => {

        const original_object = {
            a: {
                b: {
                    c: 3
                }
            },
            e: 'test'
        }


        const clone_object = clone(original_object)
        expect(clone_object).toStrictEqual(original_object)
        expect(clone_object.a.b !== original_object.a.b).toBeTruthy()
    })
})