import { IEdge, IElement } from "./network";
import { random_element } from "./utils";




// random pattern builder
// 1. build random pattern
// 2. match pattern

type IAddPatternConnection = {
    from: IPatternSocket
    from_output_index: number
    to: IPatternSocket
    to_input_index: number
}

type IAddPaternSocket = {
    
}

type IPatternEdge = {
    from: IPatternSocket;
    from_index: number
    to: IPatternSocket
    to_index: number
}

type IPatternSocket = {
    type: 'input' | 'output'
    original_element: IElement

}

type IPatternElement = {
    inputs: Array<Set<IPatternEdge>>
    outputs: Array<Set<IPatternEdge>>
    original_element: IElement
}

type IPattern = {
    start_element: IPatternElement
}


const get_pattern_element = (element: IElement, pattern_elements_matching: Map<IElement, IPatternElement>) => {
    let pattern_element = pattern_elements_matching.get(element)
    if (!pattern_element) {
        pattern_element = generate_pattern_element_from(element)
        pattern_elements_matching.set(element, pattern_element)
    }
    return pattern_element
}

const add_available_edges = (
    original_element: IElement,
    pattern_elements_matching: Map<IElement, IPatternElement>,
    available_actions: Set<IAddPatternConnection>,

) => {
    for (let i = 0; i < original_element.inputs.length; i++) {
        const in_connections = original_element.inputs[i]
        for (const in_connection of in_connections) {
            available_actions.add({
                from: get_pattern_element(in_connection.from, pattern_elements_matching),
                from_output_index: in_connection.from_index,
                to: get_pattern_element(original_element, pattern_elements_matching),
                to_input_index: in_connection.to_index
            })
        }

    }
    for (let o = 0; o < original_element.outputs.length; o++) {
        const out_connections = original_element.outputs[o]

        for (const out_connection of out_connections) {
            available_actions.add({
                from: get_pattern_element(original_element, pattern_elements_matching),
                from_output_index: out_connection.from_index,
                to: get_pattern_element(out_connection.to, pattern_elements_matching),
                to_input_index: out_connection.to_index
            })
        }
    }
}

const generate_pattern_element_from = (element: IElement): IPatternElement => {
    const pattern_element: IPatternElement = {
        inputs: element.inputs.map(inputs => new Set()),
        outputs: element.outputs.map(outputs => new Set()),
        original_element: element,
    }
    return pattern_element
}
const generate_pattern = (elements: Set<IElement>, size: number): IPattern => {
    const available_actions: Set<IAddPatternConnection> = new Set()
    const pattern_element_matching = new Map<IElement, IPatternElement>();
    const random_start_point = random_element(elements)

    const pattern: IPattern = {
        start_element: generate_pattern_element_from(random_start_point)
    }
    add_available_edges(random_start_point, pattern_element_matching, available_actions)
    for (let i = 0; i < size; ++i) {
        const random_action = random_element(available_actions)

        const connection_to_add: IPatternEdge = {
            from: random_action.from,
            from_index: random_action.from_output_index,
            to: random_action.to,
            to_index: random_action.to_input_index
        }
        random_action.from.outputs[random_action.from_output_index].add(connection_to_add)
        random_action.to.inputs[random_action.to_input_index].add(connection_to_add)
        add_available_edges(random_action.to.original_element, pattern_element_matching, available_actions)
    }
    return pattern
}


const match_pattern = (network: Set<IElement>, pattern: IPattern) => {

    for (const possible_start_point of network) {
        // if (possible_start_point === pattern.start_element) {
        //     continue
        // }

        const element_mapping = new Map<IElement, IElement>()
        element_mapping.set(possible_start_point, pattern.start_element)


    }
}

export const find_subnetworks = (elements: Set<IElement>) => {

    const pattern = generate_pattern(elements, 1)

    match_pattern(elements, pattern)


}