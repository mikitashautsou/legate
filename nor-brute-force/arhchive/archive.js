
const learnTSwitch = async () => {
    log('STARTED')
    const NORS = 4
    const { best_config, iterations } = await search({
        inputs: 1,
        outputs: 1,
        nors: NORS,
        fitnessFunc: async (execute) => {
            let score = 0
            if (execute([0])[0] === 0) {
                score += 1
            }
            if (execute([1])[0] === 0) {
                score += 1
            }
            if (execute([0])[0] === 1) {
                score += 1
            }

            if (execute([0])[0] === 1) {
                score += 1
            }

            if (execute([1])[0] === 1) {
                score += 1
            }
            if (execute([1])[0] === 1) {
                score += 1
            }
            if (execute([0])[0] === 0) {
                score += 1
            }

            if (execute([0])[0] === 0) {
                score += 1
            }
            if (execute([0])[0] === 0) {
                score += 1
            }
            if (execute([1])[0] === 0) {
                score += 1
            }
            if (execute([0])[0] === 1) {
                score += 1
            }
            if (execute([0])[0] === 1) {
                score += 1
            }
            if (execute([0])[0] === 1) {
                score += 1
            }
            if (execute([0])[0] === 1) {
                score += 1
            }
            if (execute([1])[0] === 1) {
                score += 1
            }
            if (execute([0])[0] === 0) {
                score += 1
            }

            if (execute([0])[0] === 0) {
                score += 1
            }
            if (execute([0])[0] === 0) {
                score += 1
            }
            return score
        },
        // stopCondition: ({ fitness }) => fitness > 3,
        // maxTime: 1_000 * 60 * 10,
        // maxTime: 1_000 * 5,
    })

    render_graph(best_config, 1, 1, NORS)


    norExecutor.configure(best_config)
    norExecutor.reset()
    function test(inputs) {
        return norExecutor.execute(inputs)
    }
    window.ask = test
}

