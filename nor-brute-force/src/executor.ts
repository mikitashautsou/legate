import { IEdge, IElement, NODE_OPERATIONS, Signal } from "./network";

const process_node = (node: IElement, activated_nodes: IElement[]) => {

    if (node.type !== 'nor' && node.type !== 'output') {
        throw new Error('Executor fault: trying to process not NOR or OUTPUT nodes')
    }
    const values: Signal[] = []
    for (let i = 0; i < node.inputs.length; ++i) {
        const inputs = node.inputs[i]
        for (const input of inputs) {
            values[i] |= input.value ?? 0
        }
    }
    const result = NODE_OPERATIONS[node.type](...values)
    if (result == node.value) {
        return
    }
    node.value = result
    for (const outputs of node.outputs) {
        for (const output of outputs) {
            if (output.value == result) {
                continue
            }
            output.value = result
            if (!activated_nodes.some(an => an == output.to)) {
                activated_nodes.push(output.to)
            }
        }
    }
}

const MAX_ITERATIONS = 500;
export const execute = (inputs: Array<IElement>, outputs: Array<IElement>, input_values: Signal[]): Signal[] => {

    const activated_nodes: Array<IElement> = []

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        const new_value = input_values[i]
        if (new_value == input.value) {
            continue
        }
        input.value = new_value
        for (const output_edge of input.outputs[0]) {
            if (output_edge.value == new_value) {
                continue
            }
            output_edge.value = new_value
            if (!activated_nodes.some(an => an == output_edge.to)) {
                activated_nodes.push(output_edge.to)
            }
        }
    }

    let iteration = 0
    while (activated_nodes.length > 0) {
        if (MAX_ITERATIONS < iteration) {
            throw new Error('Executor fault: too many iterations for network to execute, current execution limit set to: ' + MAX_ITERATIONS)
        }
        process_node(activated_nodes.shift()!, activated_nodes)
        ++iteration
    }
    return outputs.map(e => e.value)
}

export const reset_network = (elements: Set<IElement>, edges: Set<IEdge>) => {
    elements.forEach(e => e.value = null)
    edges.forEach(e => e.value = null)
}