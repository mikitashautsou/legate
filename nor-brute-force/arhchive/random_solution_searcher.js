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




export const search = ({
    inputs, outputs, nors, fitnessFunc,
    maxTime = 10_000,
    stopCondition
}) => {



    norExecutor.init(inputs, outputs, nors)

    let config_matrix = init_matrix(inputs + nors, outputs + nors * 2)
    let best_config = init_matrix(config_matrix.length, config_matrix[0].length)

    let best_fitness = -Infinity
    let startTime = Date.now()
    while ((Date.now() - startTime) < maxTime && (!stopCondition || !stopCondition({ fitness: best_fitness }))) {
        console.log({
            time: (Date.now() - startTime),
            maxTime,
            fitness: best_fitness
        })
        for (let i = 0; i < config_matrix.length; i++) {
            for (let j = 0; j < config_matrix[i].length; j++) {
                // config_matrix[Math.floor(Math.random() * config_matrix.length)][Math.floor(Math.random() * config_matrix[0].length)] = Math.random() > 0.5 ? 1 : 0
                config_matrix[i][j] = Math.random() > 0.5 ? 1 : 0

            }
        }
        norExecutor.configure(config_matrix)
        let fitness = fitnessFunc((inputs) => norExecutor.execute(inputs))
        let complexity = 0
        for (let i = 0; i < config_matrix.length; i++) {
            for (let j = 0; j < config_matrix[i].length; j++) {
                if (config_matrix[i][j] === 1) {
                    complexity += 1
                }
            }
        }
        fitness -= complexity * 0.0000000001

        if (fitness > best_fitness) {
            copy_matrix(config_matrix, best_config)
            best_fitness = fitness
            console.log('best result so far: ', fitness)
        }
    }
    return {
        best_config,
        best_fitness,
    }

}