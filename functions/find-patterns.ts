import { EqRelation, Relation } from "./parse-env-file";

export const findPatterns = (knowledge: (EqRelation | Relation)[]) => {

    const relation = knowledge[0]


}

const getRepetitiveFactor = (pattern: (EqRelation | Relation)[], knowledge: (EqRelation | Relation)[]) => {

    // const matchingVariables = []

    for (const patternComponent of pattern) {
        for (const entryPoint of knowledge) {
            if (patternComponent.type === 'equal') {
                if (entryPoint.type === 'equal' && entryPoint.value === patternComponent.value) {
                    // start from this entry point
                }
            } else if (patternComponent.type === 'relation' && entryPoint.type === 'relation') {
                if (patternComponent.values.length === entryPoint.values.length) {
                    // start from this entry point
                }
            }
        }
    }
    const occurenceEntryPoints = []


}