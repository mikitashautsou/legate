import fs from 'fs'
import { IDatabase } from './models'

export const saveKnowledge = (database: IDatabase) => {
    if (!fs.existsSync('knowledge')) {
        fs.mkdirSync('knowledge')
    }
    fs.writeFileSync(`knowledge/knowledge-${Date.now()}.json`, JSON.stringify(database, null, 2))
}

export const loadKnowledge = (): IDatabase => {
    try {
        const result = fs.readdirSync('knowledge/').sort().reverse()[0]
        return JSON.parse(fs.readFileSync(`knowledge/${result}`).toString()) as IDatabase
    } catch (e) {
        return {
            facts: [],
            rules: []
        }
    }
}