







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

// const database: IDatabase = [
//     Fact('IS', 'SOCRAT', 'HUMAN'),
// ]

// const rules = [
//     Rule(
//         [Fact('IS', '$A', 'HUMAN')],
//         [Fact('IS', '$A', 'MORTAL')]
//     )
// ]

const database: IDatabase = [
    Fact('PARENT', 'SON', 'DAD'),
    Fact('PARENT', 'DAD', 'GRANDDAD'),
]

const rules = [
    Rule(
        [Fact('PARENT', '$A', '$B')],
        [Fact('PREDECESSOR', '$A', '$B')]
    ),
    Rule(
        [Fact('PREDECESSOR', '$A', '$B'), Fact('PREDECESSOR', '$B', '$C')],
        [Fact('PREDECESSOR', '$A', '$C')]
    )
]


const onlyUnique = (value: any, index: any, self: any) => self.indexOf(value) === index;
const isVariable = (param: string) => param.startsWith('$')
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
console.log(database)