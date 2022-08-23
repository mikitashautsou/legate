





let state_vector = []
let execution_matrix = []
let connection_matrix = []
let nor_count
let outputs_count;
let inputs_count;

const init_matrix = (height, width) => {
    const matrix = []
    for (let i = 0; i < height; i++) {
        const row = []
        for (let j = 0; j < width; j++) {
            row.push(0)
        }
        matrix.push(row)
    }
    return matrix
}

const init_vector = (size) => new Array(size).fill(0)

export const init_executor = (ic, oc, nc) => {

    outputs_count = oc
    inputs_count = ic
    nor_count = nc
    const producers_count = ic + nc
    const consumers_count = oc + nc * 2

    connection_matrix = init_matrix(producers_count, consumers_count)
    execution_matrix = init_matrix(producers_count, consumers_count)
    state_vector = init_vector(ic + nc + oc)

}

/*

connection matrix

      o1 n1 n2
i1   [0, 1, 0],
i2   [0, 0, 1],
nor  [1, 0, 0],

execution matrix
      o1 n1 n2
i1   [0, 1, 0],
i2   [0, 0, 1],
nor  [0, 0, 0],






connection matrix

      o1 n1 n2
i1   [0, 1, 0],
i2   [0, 0, 1],
nor  [1, 0, 0],

execution matrix
      o1 n1 n2
i1   [0, 1, 0],
i2   [0, 0, 1],
nor  [0, 0, 0],

execution vector 0 1

1.===================

execution vector 0 1

connection matrix

      o1 n1 n2
i1   [0, 1, 0],
i2   [0, 0, 1],
nor  [1, 0, 0],

execution matrix
      o1 n1 n2
i1   [0, 0, 0],
i2   [0, 0, 1],
nor  [0, 0, 0],

n -> 0

execution vector 0 1, 0, 0

state vector: i i i nor1l nor1r o o

consumer: o o nor1l nor1r
producer: i i i nor1 nor2
*/
const transform_from_execution_to_state_indexation = (execution_matrix_to_index) => {

    return Math.floor((execution_matrix_to_index - outputs_count) / 2) + inputs_count
}

const to_consumer_execution_indexation = (state_index) => {
    return state_index
}

export const execute = (inputs) => {

    const activatedStatesForCopying = []
    const activatedStateForCalculation = []
    for (let i = 0; i < inputs.length; i++) {
        state_vector[i] = inputs[i]
        activatedStatesForCopying.push(i)
    }
    let iteration = 0
    while (iteration < 500) {

        while (activatedStatesForCopying.length > 0) {
            const activatedState = activatedStatesForCopying.shift()
            // copy values from state vector to execution matrix
            for (let to = 0; to < execution_matrix[0].length; to++) {
                if (connection_matrix[activatedState][to] === 1) {
                    const previous_value = execution_matrix[activatedState][to]
                    execution_matrix[activatedState][to] = state_vector[activatedState]
                    const state_vector_index = transform_from_execution_to_state_indexation(to)
                    if (previous_value !== execution_matrix[activatedState][to] && !activatedStatesForCopying.includes(state_vector_index)) {
                        activatedStateForCalculation.push(state_vector_index)
                    }
                }
            }
        }

        while (activatedStateForCalculation.length > 0) {
            const activatedState = activatedStateForCalculation.shift()


            if (activatedState < outputs_count) {//it's output
                for (let i = 0; i < execution_matrix[activatedState]; i++) {
                    state_vector[inputs_count + nor_count + o] |= execution_matrix[activatedState][i]
                }
            } else {//it's nor input

            }
        }
        // calc state vector values
        for (let nor_index = 0; nor_index < nor_count; nor_index++) {
            const nor_left_input_index_in_execution_matrix = outputs_count + nor_index * 2
            const nor_right_input_index_in_execution_matrix = nor_left_input_index_in_execution_matrix + 1
            let left_input = 0
            let right_input = 0
            for (let i = 0; i < execution_matrix.length; i++) {
                left_input |= execution_matrix[i][nor_left_input_index_in_execution_matrix]
            }
            for (let i = 0; i < execution_matrix.length; i++) {
                right_input |= execution_matrix[i][nor_right_input_index_in_execution_matrix]
            }
            state_vector[inputs_count + nor_index] = (left_input | right_input) === 0 ? 1 : 0
        }

        for (let o = 0; o < outputs_count; o++) {
            for (let i = 0; i < execution_matrix[o]; i++) {
                state_vector[inputs_count + nor_count + o] |= execution_matrix[o][i]
            }
        }
    }
}

export const update_connection = (from, to, value) => {
    connection_matrix[from][to] = value
}

