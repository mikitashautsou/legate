import prompt from 'prompt-sync'
import { loadKnowledge } from './io';
import { parseInput } from './user-interactions';

const question = prompt({})

const start = async () => {
    const database = loadKnowledge()

    console.log(`:D READY FOR WORK`)
    parseInput(() => question({}), database)
}

start()
