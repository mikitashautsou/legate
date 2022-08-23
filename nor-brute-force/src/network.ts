
export type Signal = 1 | 0
export type IEdge = {
    type: 'connection',
    from: IElement,
    from_index: number
    to: IElement,
    to_index: number
    active: boolean,
    value: 1 | 0 | null
}

export type IAction = IAddNorAction | IRemoveNorAction | IConnectAction | IDisconnectAction

export type IAddNorAction = {
    type: 'add_nor',
}

export type IRemoveNorAction = {
    type: 'remove_nor',
    target: IElement
}

export type IConnectAction = {
    type: 'connect',
    from: IElement
    from_input_index: number
    to: IElement,
    to_output_index: number
}
export type IDisconnectAction = {
    type: 'disconnect',
    originator: IConnectAction
    target: IEdge
}


export type IElement = {
    id: ID,
    type: 'input' | 'output' | 'nor',
    inputs: Set<IEdge>[],
    outputs: Set<IEdge>[],
    value: 1 | 0 | null,
}


export type INetwork = {
    inputs: IElement[]
    outputs: IElement[]
    elements: Set<IElement>
    edges: Set<IEdge>
}




export type NodeType = 'input' | 'output' | 'nor'

let id = -1
type ID = number
const ID = (): ID => ++id

export const INPUT = (): IElement => ({
    id: ID(),
    type: 'input',
    inputs: [],
    outputs: [new Set()],
    value: null,
})

export const OUTPUT = (): IElement => ({
    id: ID(),
    type: 'output',
    inputs: [new Set()],
    outputs: [],
    value: null
})

export const NOR = (): IElement => ({
    id: ID(),
    type: 'nor',
    outputs: [new Set()],
    inputs: [new Set(), new Set()],
    value: null
})

export const EDGE = (from: IElement, from_index: number, to: IElement, to_index: number): IEdge => ({
    type: 'connection',
    from_index,
    to_index,
    from,
    to,
    active: true,
    value: null
})

export const NODE_OPERATIONS = {
    'nor': (...values: Signal[]) => (values[0] | values[1]) == 0 ? 1 : 0,
    'output': (...values) => values[0]
}

export const connect = (from: IElement, from_index: number, to: IElement, to_index: number) => {
    const edge = EDGE(from, from_index, to, to_index)
    from.outputs[from_index].add(edge)
    to.inputs[to_index].add(edge)
    return edge
}

export const print_actions = (actions: Iterable<IAction>) => {
    console.log(Array.from(actions).map((a, i) => {
        if (a.type === 'connect') {
            return `${i}. connect ${a.from.id}(${a.from_input_index}) -> ${a.to.id}(${a.to_output_index})`
        } else if (a.type === 'disconnect') {
            return `${i}. disconnect ${a.target.from.id}(${a.originator.from_input_index}) -> ${a.target.to.id}(${a.originator.to_output_index})`
        } else if (a.type === 'remove_nor') {
            return `${i}. remove ${a.target.id}`
        } else {
            return `${i}. ${a.type}`
        }
    }).join('\n'))
}



// // maybe it will be better to use rollback actions instead of full network copying...
// export const clone_network = (network: INetwork) => {
//     const cloned_inputs = network.inputs.map(i => )
// }