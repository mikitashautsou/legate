import { EDGE, IAction, IConnectAction, IDisconnectAction, IEdge, IElement, INPUT, IRemoveNorAction, NOR, OUTPUT } from "./network"


export const add_nor = (available_actions: Set<IAction>, elements: Set<IElement>): void => {
    const nor = NOR()
    available_actions.add({ type: 'remove_nor', target: nor })
    for (const another_element of elements) {
        for (let o = 0; o < another_element.outputs.length; o++) {
            available_actions.add({ type: 'connect', from: another_element, to: nor, from_input_index: o, to_output_index: 0 })
            available_actions.add({ type: 'connect', from: another_element, to: nor, from_input_index: o, to_output_index: 1 })

        }
        for (let i = 0; i < another_element.inputs.length; i++) {
            available_actions.add({ type: 'connect', from: nor, to: another_element, from_input_index: 0, to_output_index: i })
        }
    }

    elements.add(nor)
}

export const remove_nor = (target_nor: IElement, elements: Set<IElement>, available_actions: Set<IAction>, edges: Set<IEdge>): void => {
    const deleted_edges = new Set<IEdge>()
    for (const inputs of target_nor.inputs) {
        for (const incoming_edge of inputs) {
            const source = incoming_edge.from
            for (const outputs of source.outputs) {
                outputs.delete(incoming_edge)
                deleted_edges.add(incoming_edge)
            }
        }
    }
    for (const outputs of target_nor.outputs) {
        for (const outcoming_edge of outputs) {
            const destination = outcoming_edge.to
            for (const inputs of destination.inputs) {
                inputs.delete(outcoming_edge)
                deleted_edges.add(outcoming_edge)
            }
        }
    }
    elements.delete(target_nor)
    const actions_to_remove = new Set<IAction>()
    for (const action of available_actions) {
        if (action.type === 'connect') {
            if (action.from === target_nor || action.to === target_nor) {
                actions_to_remove.add(action)
            }
        }
        if (action.type === 'disconnect' && deleted_edges.has(action.target)) {
            actions_to_remove.add(action)
        }
        if (action.type === 'remove_nor' && action.target === target_nor) {
            actions_to_remove.add(action)
        }
    }
    actions_to_remove.forEach(a => available_actions.delete(a))
    deleted_edges.forEach(de => edges.delete(de))

}

export const connect_elements = (action: IConnectAction, available_actions: Set<IAction>, edges: Set<IEdge>): void => {
    const { from, to, from_input_index, to_output_index } = action
    const edge = EDGE(from, from_input_index, to, to_output_index)
    edges.add(edge)
    available_actions.add({ type: 'disconnect', target: edge, originator: action })

    from.outputs[from_input_index].add(edge)
    to.inputs[to_output_index].add(edge)
    let remove_from_action: IRemoveNorAction | null = null;
    let remove_to_action: IRemoveNorAction | null = null;
    for (const action of available_actions) {
        if (action.type === 'remove_nor' && action.target === from) {
            remove_from_action = action
        }
        if (action.type === 'remove_nor' && action.target === to) {
            remove_to_action = action
        }
    }
    if (remove_from_action) {
        available_actions.delete(remove_from_action)
    }
    if (remove_to_action) {
        available_actions.delete(remove_to_action)
    }
}

export const disconnect_elements = (action: IDisconnectAction, available_actions: Set<IAction>, edges: Set<IEdge>): void => {
    const { target: target_edge, originator: { from_input_index, to_output_index, from, to } } = action
    available_actions.add({ type: 'connect', from: target_edge.from, from_input_index, to: target_edge.to, to_output_index })

    edges.delete(target_edge)
    target_edge.from.outputs.forEach(o => o.delete(target_edge))
    target_edge.to.inputs.forEach(i => i.delete(target_edge))

    if (from.type != 'input' && from.type != 'output' && from.outputs.every(i => i.size === 0) && from.inputs.every(o => o.size === 0)) {
        available_actions.add({ type: 'remove_nor', target: from })
    }
    if (to.type != 'input' && to.type != 'output' && to.inputs.every(i => i.size === 0) && to.outputs.every(o => o.size === 0)) {
        available_actions.add({ type: 'remove_nor', target: to })
    }
}

export const apply_action = (edges: Set<IEdge>, elements: Set<IElement>, action: IAction, available_actions: Set<IAction>) => {

    if (action.type === 'add_nor') {
        add_nor(available_actions, elements)
    } else if (action.type === 'remove_nor') {
        remove_nor(action.target, elements, available_actions, edges)
    } else if (action.type === 'connect') {
        connect_elements(action, available_actions, edges)
    } else if (action.type === 'disconnect') {
        disconnect_elements(action, available_actions, edges)
    }
    if (action.type !== 'add_nor') {
        available_actions.delete(action)
    }
}

export const init_search = (inputs_count: number, outputs_count: number) => {
    const inputs: Array<IElement> = []
    const outputs: Array<IElement> = []
    const available_actions = new Set<IAction>()
    const edges = new Set<IEdge>()
    const elements = new Set<IElement>()
    for (let i = 0; i < inputs_count; i++) {
        const input = INPUT()
        elements.add(input)
        inputs.push(input)
    }
    for (let o = 0; o < outputs_count; o++) {
        const output = OUTPUT()
        elements.add(output)
        outputs.push(output)
    }

    for (let input of elements) {
        if (input.outputs.length === 0) {
            continue
        }
        for (let output of elements) {
            if (output.inputs.length === 0) {
                continue
            }
            available_actions.add({ type: 'connect', from: input, from_input_index: 0, to_output_index: 0, to: output })
        }
    }
    available_actions.add({ type: 'add_nor' })
    return {
        inputs,
        outputs,
        edges,
        elements,
        available_actions
    }

}