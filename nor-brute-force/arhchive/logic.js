import { norExecutor } from "./nor-executor-oop"



const AND = () => {
    const nor1 = norExecutor.addNor()
    const nor2 = norExecutor.addNor()
    const nor3 = norExecutor.addNor()

    norExecutor.connect(nor1, nor3, true)
    norExecutor.connect(nor2, nor3, false)
    return {
        output1: (norElement, asLeft) => {
            norExecutor.connect(nor3, norElement, asLeft)
        },
        input1: (norElement) => {
            norExecutor.connect(norElement, nor1, true)
            norExecutor.connect(norElement, nor1, false)
        },
        input2: (norElement) => {
            norExecutor.connect(norElement, nor2, true)
            norExecutor.connect(norElement, nor2, false)
        },
    }

}

const NOT = () => {
    const nor1 = norExecutor.addNor()

    return {
        outputNor: nor1,
        output1: (norElement, asLeft) => {
            norExecutor.connect(nor1, norElement, asLeft)
        },
        input1: (norElement) => {
            norExecutor.connect(norElement, nor1, true)
            norExecutor.connect(norElement, nor1, false)
        },
    }

}

const OR = () => {
    const not = NOT()
    const nor1 = norExecutor.addNor()

    not.input1(nor1)
    return {
        output1: (norElement, asLeft) => {
            not.output1(norElement, asLeft)
        },
        input1: (norElement) => {
            norExecutor.connect(norElement, nor1, true)
        },
        input2: (norElement) => {
            norExecutor.connect(norElement, nor1, false)
        },
    }
}


const D_LATCH = () => {

    const upperNor = norExecutor.addNor()
    const bottomNor = norExecutor.addNor()

    norExecutor.connect(upperNor, bottomNor, true)
    norExecutor.connect(bottomNor, upperNor, false)

    const upperAnd = AND()
    const bottomAnd = AND()

    upperAnd.output1(upperNor, true)
    bottomAnd.output1(bottomNor, false)


    const dataBottomNot = NOT()

    bottomAnd.input2(dataBottomNot.outputNor)

    return {
        output1: bottomNor,
        data_i: (e) => {
            upperAnd.input1(e)
            dataBottomNot.input1(e)
        },
        store_i: (e) => {
            upperAnd.input2(e)
            bottomAnd.input1(e)
        }
    }
}


const D_FLIP_FLOP = () => {


    const firstDLatch = D_LATCH()
    const secondDLatch = D_LATCH()
    const not = NOT()
    firstDLatch.store_i(not.outputNor)
    secondDLatch.data_i(firstDLatch.output1)

    return {
        output: secondDLatch.output1,
        data_i: (e) => {
            firstDLatch.data_i(e)
        },
        clock: (e) => {
            not.input1(e)
            secondDLatch.store_i(e)
        }
    }
}

const INVERSED_D_FLIP_FLOP = () => {


    const firstDLatch = D_LATCH()
    const secondDLatch = D_LATCH()
    const resultNot = NOT()
    const not = NOT()
    firstDLatch.store_i(not.outputNor)
    secondDLatch.data_i(firstDLatch.output1)

    resultNot.input1(secondDLatch.output1)
    return {
        output: resultNot.outputNor,
        data_i: (e) => {
            firstDLatch.data_i(e)
        },
        clock: (e) => {
            not.input1(e)
            secondDLatch.store_i(e)
        }
    }
}

const SWITCH = () => {

    const latch1 = D_LATCH()
    const latch2 = D_LATCH()

    const dataNot = NOT()
    const storeNot = NOT()

    dataNot.input1(latch2.output1)
    latch2.data_i(latch1.output1)
    latch2.store_i(storeNot.outputNor)

    latch1.data_i(dataNot.outputNor)

    return {
        output: latch2.output1,
        input: e => {
            latch1.store_i(e)
            storeNot.input1(e)
        }
    }

}


export const run = () => {

    const sw = SWITCH()

    const input1 = norExecutor.addInput()
    const output = norExecutor.addOutput()

    sw.input(input1)
    norExecutor.connect(sw.output, output)

    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([0]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([1]))
    console.log(norExecutor.execute([1]))
}


const dLatchExample = () => {
    const dLatch = D_LATCH()

    const input1 = norExecutor.addInput()
    const input2 = norExecutor.addInput()
    const output = norExecutor.addOutput()

    dLatch.data_i(input1)
    dLatch.store_i(input2)
    norExecutor.connect(dLatch.output1, output)

    console.log(norExecutor.execute([0, 0]))
    console.log(norExecutor.execute([1, 0]))
    console.log(norExecutor.execute([0, 1]))
    console.log(norExecutor.execute([1, 1]))
    console.log(norExecutor.execute([1, 0]))
    console.log(norExecutor.execute([0, 0]))
    console.log(norExecutor.execute([0, 1]))
}

const dFlipFlopTest = () => {
    const dFlipFlop = D_FLIP_FLOP()

    const input1 = norExecutor.addInput()
    const input2 = norExecutor.addInput()
    const output = norExecutor.addOutput()

    dFlipFlop.data_i(input1)
    dFlipFlop.clock(input2)
    norExecutor.connect(dFlipFlop.output, output)

    console.log(norExecutor.execute([0, 0]))
    console.log(norExecutor.execute([1, 0]))
    console.log(norExecutor.execute([1, 0]))
    console.log(norExecutor.execute([1, 1]))
    console.log(norExecutor.execute([1, 1]))
    console.log(norExecutor.execute([0, 1]))
    console.log(norExecutor.execute([0, 1]))
    console.log(norExecutor.execute([0, 0]))
    console.log(norExecutor.execute([0, 0]))
}