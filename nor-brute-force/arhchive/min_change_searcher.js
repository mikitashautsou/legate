import { checkForceStop } from "./force-stop"
import { log } from "./logger"
import { norExecutor } from "./nor-executor-oop"
import { show_progress } from "./progress_displayer"







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



const TEMPREATURE_DECAY = 0.9999

export const search = async ({
    inputs, outputs, nors, fitnessFunc,
    maxTime = Infinity,
    stopCondition
}) => {




    norExecutor.init(inputs, outputs, nors)

    let config_matrix = init_matrix(inputs + nors, outputs + nors * 2)
    let best_config = init_matrix(config_matrix.length, config_matrix[0].length)

    let best_fitness = -Infinity
    let startTime = Date.now()
    let tempreture = config_matrix.length * config_matrix[0].length * 10
    const total_iterations = Math.log(1 / tempreture) / Math.log(TEMPREATURE_DECAY)

    let lastRepaint = Date.now()
    let now = Date.now()
    let iteration = 0
    while (tempreture >= 1 && (now - startTime) < maxTime && (!stopCondition || !stopCondition({ fitness: best_fitness }))) {
        now = Date.now()
        checkForceStop()
        iteration++;

        if ((now - lastRepaint) > 1_000) {
            const time_per_iteration = (now - startTime) / iteration
            const remaining_iterations = total_iterations - iteration
            const remaining_time = remaining_iterations * time_per_iteration
            await show_progress(iteration / total_iterations, remaining_time)
            lastRepaint = now
        }
        tempreture *= TEMPREATURE_DECAY

        for (let k = 0; k < tempreture; k++) {
            const i = Math.floor(Math.random() * config_matrix.length)
            const j = Math.floor(Math.random() * config_matrix[0].length)
            config_matrix[i][j] = Math.random() > 0.5 ? 1 : 0
        }
        norExecutor.configure(config_matrix)
        norExecutor.reset()
        let fitness
        try {
            fitness = await fitnessFunc((inputs) => norExecutor.execute(inputs))
        } catch (e) {
            fitness = -Infinity
        }
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
            await log('best result so far: ', fitness, 'tempreature', tempreture)
        } else {
            copy_matrix(best_config, config_matrix)
        }
    }
    return {
        best_config,
        best_fitness,
    }

}