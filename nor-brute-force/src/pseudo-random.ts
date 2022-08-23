




let mock_random_warning_shown = false
export const use_pseudo_random_values = () => {
    if (!mock_random_warning_shown) {
        console.warn('!!!WARNING!!! PSEUDORANDOM ENGINE WILL BE USED')
        mock_random_warning_shown = true
    }
    // @ts-ignore
    Math.random = () => {
        if (RANDOM_VALUES.length === 0) {
            throw new Error('Pserandom engine error: pseudo random values exceeded')
        }
        return RANDOM_VALUES.pop()
    }
}