
export const Fact = (name: string, ...values: string[]) => ({
    type: 'fact',
    name,
    values,
})

export const Rule = (premises: IFact[], conclusions: IFact[]) => ({
    type: 'rule',
    premises,
    conclusions
})

export type IRule = ReturnType<typeof Rule>
export type IFact = ReturnType<typeof Fact>
export type IFacts = IFact[]
export type IDatabase = {
    facts: IFacts,
    rules: IRule[]
}