


import prompt from 'prompt-sync'
import fs from 'fs'

const question = prompt({})

const ifThen = (conditionalFunc: any, ifTrue: any) => () => conditionalFunc() ? ifTrue() : undefined

const logMessage = (message) => () => console.log('INFO: ', message)

const saveKnowledge = (database, rules) => {
    if (!fs.existsSync('knowledge')) {
        fs.mkdirSync('knowledge')
    }
    fs.writeFileSync(`knowledge/knowledge-${Date.now()}.json`, JSON.stringify({
        database,
        rules
    }, null, 2))
}

const loadKnowledge = () => {
    try {
        const result = fs.readdirSync('knowledge/').sort().reverse()[0]
        return JSON.parse(fs.readFileSync(`knowledge/${result}`).toString())
    } catch (e) {
        return {
            database: [],
            rules: []
        }
    }
}
const pipe = (...functions: any[]) => functions.reduce((p: any, f: any) => {
    console.log(`INPUT: ${JSON.stringify(p, null, 2)}`)
    return f(p)
}, undefined)

const Fact = (name: string, ...values: string[]) => ({
    type: 'fact',
    name,
    values,
})

const Rule = (premises: IFact[], conclusions: IFact[]) => ({
    type: 'rule',
    premises,
    conclusions
})

type IRule = ReturnType<typeof Rule>
type IFact = ReturnType<typeof Fact>
type IDatabase = IFact[]

const { database, rules } = loadKnowledge()

const onlyUnique = (value: any, index: any, self: any) => self.indexOf(value) === index;
const isVariable = (param: string) => param.startsWith('$') || param === '*'
const findUnboundVariables = (rule: IRule) => rule.premises.concat(rule.conclusions).flatMap((e) => e.values).filter(isVariable).filter(onlyUnique)
const isFactTrue = (database: IDatabase, fact: IFact) => database.some(f => f.name === fact.name && f.values.every((v, i) => fact.values[i] === v))
const queryFacts = (database: IDatabase, pattern: IFact) => database.filter(f => f.name === pattern.name && f.values.every((v, i) => pattern.values[i] === v || isVariable(pattern.values[i])))

const applyRule = (database: IDatabase, rule: IRule) => {
    const unboundedVariables = findUnboundVariables(rule)

    if (unboundedVariables.length > 0) {
        const [firstUnboundedVariable] = unboundedVariables
        const [factWithUnboundedVariable] = rule.premises.concat(rule.conclusions).filter(f => f.values.some(v => v === firstUnboundedVariable))
        const boundedFacts = queryFacts(database, factWithUnboundedVariable)
        for (const boundedFact of boundedFacts) {
            for (let componentIndex = 0; componentIndex < boundedFact.values.length; componentIndex++) {
                if (isVariable(factWithUnboundedVariable.values[componentIndex])) {
                    const variableValue = boundedFact.values[componentIndex]
                    const partiallyBoundedRule: IRule = {
                        type: rule.type,
                        premises: rule.premises.map(p => ({
                            ...p,
                            values: p.values.map(v => v === firstUnboundedVariable ? variableValue : v)
                        })),
                        conclusions: rule.conclusions.map(c => ({
                            ...c,
                            values: c.values.map(v => v === firstUnboundedVariable ? variableValue : v)
                        }))
                    }
                    applyRule(database, partiallyBoundedRule)
                    break;
                }
            }
        }

    } else {
        if (rule.premises.every(p => isFactTrue(database, p))) {
            database.push(...rule.conclusions.filter(c => !isFactTrue(database, c)))
        }
    }

}


const applyRules = () => {
    let databaseSizeBeforeRulesApplying = database.length
    for (const rule of rules) {
        applyRule(database, rule)
    }
    if (databaseSizeBeforeRulesApplying !== database.length) {
        applyRules()
    }
}
applyRules()


const parseFact = (command) => {
    const [factName, factOperandsRaw] = command.split('(')
    const factOperands = factOperandsRaw.slice(0, -1).split(',')
    return {
        name: factName,
        type: 'fact',
        values: factOperands,
    }
}


const factToString = (fact: IFact) => `${fact.name}(${fact.values.join(', ')})`
let ruleInputStage = 'none'
let rule: IRule | null = null
while (true) {
    const command = question({}).toUpperCase().trim().replace(/\s+/g, '')
    if (command === 'GIVEN') {
        ruleInputStage = 'premises'
        rule = {
            type: 'rule',
            conclusions: [],
            premises: [],
        }
        continue
    } else if (command === 'THEN') {
        ruleInputStage = 'conclusions'
        continue
    } else if (command === 'END' && rule) {
        ruleInputStage = 'none'
        rules.push(rule)
        rule = null
        continue
    } else if (!rule && (command.startsWith('?') || command.includes('$') || command.includes('*'))) {
        const pattern = parseFact(command.startsWith('?') ? command.slice(1) : command)
        const facts = queryFacts(database, pattern)
        console.log(facts.map(factToString).join('\n'))
    } else if (command === 'SHOW') {
        console.log(database.map(factToString).join('\n'))
    } else if (rule && ruleInputStage === 'premises') {
        const newFact = parseFact(command)
        rule.premises.push(newFact)
        console.log('PREMISE ADDED')
    } else if (rule && ruleInputStage === 'conclusions') {
        const newFact = parseFact(command)
        rule.conclusions.push(newFact)
        console.log('CONCLUSION ADDED')
    } else {
        try {
            const newFact = parseFact(command)
            if (isFactTrue(database, newFact)) {
                console.log('FACT ALREADY KNOWN')
                continue
            }
            database.push(newFact)
            console.log('1 FACT ACKNOWLEDGED')
        } catch (e) {
            console.log('INVALID FORMAT')
        }
    }
    const databaseSize = database.length
    const rulesSize = rules.length
    applyRules()
    if (databaseSize !== database.length) {
        console.log(`${database.length - databaseSize} FACTS HAVE BEEN PRODUCED`)
        saveKnowledge(database, rules)
    }
    if (rulesSize !== rules.length) {
        console.log(`${rules.length - rulesSize} RULES HAVE BEEN ADDED`)
        saveKnowledge(database, rules)
    }
}


