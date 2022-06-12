
import { applyRules, drainFacts, evictFact, isFactTrue, queryFacts } from './facts-manipulation'
import { saveKnowledge } from './io'
import { IFacts, IFact, IRule, IDatabase } from './models'


let isKnowledgeFileProvided = process.argv.length > 0


const factToString = (fact: IFact) => `${fact.name}(${fact.values.join(', ')})`
const ruleToString = (rule: IRule) => {

    const premises = rule.premises.map((fact) => `    ${factToString(fact)}`).join('\n')
    const conclusions = rule.conclusions.map((fact) => `    ${factToString(fact)}`).join('\n')

    return `GIVEN
${premises}
THEN
${conclusions}
END
    `
}

const normalizeUserInput = (userInput: string) => {
    if (userInput === null) {
        return null
    }
    return userInput.toUpperCase().trim()
}

type Reader = () => string

export const parseInput = (getNextLine: Reader, database: IDatabase) => {
    let rule: IRule | null = null
    while (true) {
        let rulesCountBeforeIteration = database.rules.length
        let factsCountBeforeIteration = database.facts.length
        const command = normalizeUserInput(getNextLine())
        if (command === null) {
            console.log(`:) TERMINATING`)
            break;
        }
        if (command === 'SHOW') {
            console.log('======== FACTS ========')
            console.log(database.facts.map(factToString).join('\n'))
            console.log('======== RULES ========')
            console.log(database.rules.map(ruleToString).join('\n'))
        } else if (command === 'GIVEN') {
            const rule = parseRule(getNextLine)
            if (rule) {
                database.rules.push(rule)
            }
        } else if (command === 'DRAIN') {
            drainFacts(database)
            console.log('DATABASED DRAINED')
        }
        else if (!rule && (command.startsWith('?') || command.includes('$') || command.includes('*'))) {
            const pattern = parseFact(command.startsWith('?') ? command.slice(1) : command)
            const facts = queryFacts(database.facts, pattern)
            console.log(facts.map(factToString).join('\n'))
        } else if (command.startsWith('NOT ')) {
            const factToEvict = parseFact(command.split('NOT ')[1])
            evictFact(database, factToEvict)
        } else {
            try {
                const newFact = parseFact(command)
                if (isFactTrue(database.facts, newFact)) {
                    console.log(':| FACT ALREADY KNOWN')
                    continue
                }
                database.facts.push(newFact)
            } catch (e) {
                console.log(':( INVALID FORMAT')
            }
        }
        syncDatabase(database, rulesCountBeforeIteration, factsCountBeforeIteration)
    }
}

const parseRule = (getNextLine: Reader): IRule | null => {

    let ruleInputStage: 'premises' | 'conclusions' | 'none' = 'premises'
    const rule: IRule = {
        type: 'rule',
        conclusions: [],
        premises: [],
    }
    try {
        while (true) {
            const command = normalizeUserInput(getNextLine())
            if (command === 'THEN') {
                ruleInputStage = 'conclusions'
                continue
            } else if (command === 'END' && rule) {
                return rule
            } else {
                if (ruleInputStage === 'premises') {
                    const newFact = parseFact(command)
                    rule.premises.push(newFact)
                    console.log('PREMISE ADDED')
                } else if (ruleInputStage === 'conclusions') {
                    const newFact = parseFact(command)
                    rule.conclusions.push(newFact)
                    console.log('PREMISE ADDED')
                }
            }
        }
    } catch {
        return null
    }
}

const parseFact = (command): IFact => {
    command = command.replace(/\s+/g, '')
    const [factName, factOperandsRaw] = command.split('(')
    const factOperands = factOperandsRaw.slice(0, -1).split(',')
    return {
        name: factName,
        type: 'fact',
        values: factOperands,
        source: 'external'
    }
}

const syncDatabase = (database: IDatabase, rulesCountBeforeIteration: number, factsCountBeforeIteration: number) => {
    let syncIsNeeded = false
    applyRules(database)

    if (factsCountBeforeIteration < database.facts.length) {
        console.log(`:) ${database.facts.length - factsCountBeforeIteration} FACTS HAVE BEEN PRODUCED`)
        syncIsNeeded = true
    } else if (factsCountBeforeIteration > database.facts.length) {
        console.log(`:) ${factsCountBeforeIteration - database.facts.length} FACTS HAVE BEEN EVICTED`)
        syncIsNeeded = true
    }
    if (rulesCountBeforeIteration < database.rules.length) {
        console.log(`:) ${database.rules.length - rulesCountBeforeIteration} FACTS HAVE BEEN PRODUCED`)
        syncIsNeeded = true

    } else if (rulesCountBeforeIteration > database.rules.length) {
        console.log(`:) ${rulesCountBeforeIteration - database.rules.length} RULES HAVE BEEN PRODUCED`)
        syncIsNeeded = true

    }
    if (syncIsNeeded) {
        saveKnowledge(database)
    }
}