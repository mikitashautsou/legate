import { norExecutor } from "./nor-executor-oop"




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

const copy_matrix = (source, target) => {
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[i].length; j++) {
            target[i][j] = source[i][j]
        }
    }
}




export const mutate = ({
    inputs, outputs, nors, fitnessFunc,
    maxTime = 10_000,
    stopCondition,
    matrix
}) => {



    norExecutor.init(inputs, outputs, nors)
    norExecutor.configure(matrix)

    let temp_matrix = init_matrix(inputs + nors, outputs + nors * 2)

    let best_fitness = -Infinity
    let startTime = Date.now()
    while ((Date.now() - startTime) < maxTime && (!stopCondition || !stopCondition({ fitness: best_fitness }))) {
        console.log({
            time: (Date.now() - startTime),
            maxTime,
            fitness: best_fitness
        })
        for (let i = 0; i < temp_matrix.length; i++) {
            for (let j = 0; j < temp_matrix[i].length; j++) {
                // config_matrix[Math.floor(Math.random() * config_matrix.length)][Math.floor(Math.random() * config_matrix[0].length)] = Math.random() > 0.5 ? 1 : 0
                temp_matrix[i][j] = Math.random() > 0.5 ? 1 : 0

            }
        }
        norExecutor.configure(temp_matrix)
        let fitness = fitnessFunc((inputs) => norExecutor.execute(inputs))
        let complexity = 0
        for (let i = 0; i < temp_matrix.length; i++) {
            for (let j = 0; j < temp_matrix[i].length; j++) {
                if (temp_matrix[i][j] === 1) {
                    complexity += 1
                }
            }
        }
        fitness -= complexity * 0.0000000001

        if (fitness > best_fitness) {
            copy_matrix(temp_matrix, result_matrix)
            best_fitness = fitness
            console.log('best result so far: ', fitness)
        }
    }
    return {
        best_config: result_matrix,
        best_fitness,
    }

}