import { EqRelation, Relation } from "./parse-env-file";

export const normalizeRelations = (relations: Relation[]) => {
    let equationValueIndex = 1
    const normalizedRelations: (Relation | EqRelation)[] = []
    for (const relation of relations) {
        let normalizedRelation: Relation = {
            type: 'relation',
            values: []
        }
        for (const operand of relation.values) {
            normalizedRelation.values.push(`@_${equationValueIndex}`)
            normalizedRelations.push({
                type: 'equal',
                param: `@_${equationValueIndex}`,
                value: {
                    value: operand
                }, 
            })
            equationValueIndex++
        }
        normalizedRelations.push(normalizedRelation)
    }
    return normalizedRelations
}

export const buildCorrelations = (relations: Relation[]) => {

}