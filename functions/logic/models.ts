
export const Fact = (name: string, source: 'external' | 'produced', ...values: string[]): IFact => ({
    type: 'fact',
    name,
    values,
    source,
})

export const Rule = (premises: IFact[], conclusions: IFact[]) => ({
    type: 'rule',
    premises,
    conclusions
})

export type IRule = ReturnType<typeof Rule>
export type IFact = {
    type: 'fact',
    source: 'external' | 'produced',
    name: string
    values: string[]
}
export type IFacts = IFact[]
export type IDatabase = {
    facts: IFacts,
    rules: IRule[]
}