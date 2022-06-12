import { IDatabase, IFact, IFacts, IRule } from "./models";

export const onlyUnique = (value: any, index: any, self: any) => self.indexOf(value) === index;
export const isVariable = (param: string) => param.startsWith('$') || param === '*'
export const findUnboundVariables = (rule: IRule) => rule.premises.concat(rule.conclusions).flatMap((e) => e.values).filter(isVariable).filter(onlyUnique)
export const isFactTrue = (database: IFacts, fact: IFact) => database.some(f => f.name === fact.name && f.values.every((v, i) => fact.values[i] === v))
export const queryFacts = (database: IFacts, pattern: IFact) => database.filter(f => f.name === pattern.name && f.values.every((v, i) => pattern.values[i] === v || isVariable(pattern.values[i])))


export const applyRule = (facts: IFacts, rule: IRule) => {
    const unboundedVariables = findUnboundVariables(rule)

    if (unboundedVariables.length > 0) {
        const [firstUnboundedVariable] = unboundedVariables
        const [factWithUnboundedVariable] = rule.premises.concat(rule.conclusions).filter(f => f.values.some(v => v === firstUnboundedVariable))
        const boundedFacts = queryFacts(facts, factWithUnboundedVariable)
        for (const boundedFact of boundedFacts) {
            const partiallyBoundedRule = boundPatternVariable(rule, boundedFact, factWithUnboundedVariable, firstUnboundedVariable)
            if (partiallyBoundedRule) {
                applyRule(facts, partiallyBoundedRule)
            }

        }
    } else if (rule.premises.every(p => isFactTrue(facts, p))) {
        facts.push(...rule.conclusions.filter(c => !isFactTrue(facts, c)).map(fact => ({
            ...fact,
            source: 'produced' as 'produced'
        })))
    }

}

export const applyRules = (database: IDatabase) => {
    let databaseSizeBeforeRulesApplying = database.facts.length
    for (const rule of database.rules) {
        applyRule(database.facts, rule)
    }
    if (databaseSizeBeforeRulesApplying !== database.facts.length) {
        applyRules(database)
    }
}


export const drainFacts = (database: IDatabase) => {
    database.facts = database.facts.filter(f => f.source !== 'produced')
    applyRules(database)
}

const boundPatternVariable = (rule: IRule, boundedFact: IFact, pattern: IFact, unboundedVariableName: string) => {
    for (let componentIndex = 0; componentIndex < boundedFact.values.length; componentIndex++) {
        if (isVariable(pattern.values[componentIndex])) {
            const variableValue = boundedFact.values[componentIndex]
            const partiallyBoundedRule: IRule = {
                type: rule.type,
                premises: rule.premises.map(p => ({
                    ...p,
                    values: p.values.map(v => v === unboundedVariableName ? variableValue : v)
                })),
                conclusions: rule.conclusions.map(c => ({
                    ...c,
                    values: c.values.map(v => v === unboundedVariableName ? variableValue : v)
                }))
            }
            return partiallyBoundedRule
        }
    }
}

export const evictFact = (database: IDatabase, pattern: IFact) => {
    database.facts = database.facts.filter(f => f.name !== pattern.name || !f.values.every((v, i) => pattern.values[i] === v || isVariable(pattern.values[i])))
}