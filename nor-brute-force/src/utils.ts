
export const random_element = <T>(collection: Set<T>): T => {

    const random_index = Math.floor(Math.random() * collection.size)
    let index = 0
    for (let element of collection) {
        if (index == random_index) {
            return element
        }
        index += 1
    }
    throw new Error('Impossible situation')
}

export const clone = <E>(target: E): E => {
    return JSON.parse(JSON.stringify(target))
}

export const pause = async () => {
    throw new Error('Pause error: not implemented')
    // await new Promise<void>(resolve => (question('continue?'), resolve()))

}



export const last = <T>(collection: T[]): T => {
    return collection[collection.length - 1]
}