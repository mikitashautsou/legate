import { combine, declareVar, istructure, structured } from "../../core.js"


export const declare_advanced_array = (name, max_size) => {


    return combine(
        istructure('advanced_array', name, {
            content: [max_size],
            current_size: 0,
        }),
    )
}

export const get_element = (array, index) => {

    return `advanced_array_${array}_content[${index}]`;
}