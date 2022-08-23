



class Executor {

    inputs = []
    outputs = []
    nors = []

    nodes = []
    edges = []


    consumers = []
    producers = []

    connection_map = new Map()


    addInput() {
        const node = new Node('input')
        this.inputs.push(node)
        return node
    }

    initiated = false
    init(inputs_count, outputs_count, nors_count) {

        if (this.initiated) {
            throw new Error('Already initiated')
        }
        this.initiated = true
        // const i1 = this.addInput()
        // const i2 = this.addInput()
        // const n1 = this.addNor()
        // const o1 = this.addOutput()
        // this.connect(i1, n1, true)
        // this.connect(i1, n1, false)
        // this.connect(n1, o1)
        for (let inputIdx = 0; inputIdx < inputs_count; inputIdx++) {
            const input = this.addInput()
            this.producers.push(input)
            this.nodes.push(input)
        }
        for (let outputIdx = 0; outputIdx < outputs_count; outputIdx++) {
            const output = this.addOutput()
            this.consumers.push({ element: output, type: 'left' })
            this.nodes.push(output)
        }
        for (let norIdx = 0; norIdx < nors_count; norIdx++) {
            const nor = this.addNor()
            this.producers.push(nor)
            this.consumers.push({ element: nor, type: 'left' })
            this.consumers.push({ element: nor, type: 'right' })
            this.nodes.push(nor)
        }

        for (const producer of this.producers) {
            for (const consumer of this.consumers) {
                if (!this.connection_map.has(producer)) {
                    this.connection_map.set(producer, new Map())
                }
                const producerConnectionMap = this.connection_map.get(producer)
                if (!producerConnectionMap.has(consumer)) {
                    const connection = this.connect(producer, consumer.element, consumer.type === 'left')
                    producerConnectionMap.set(consumer, connection)
                }
            }
        }
    }
    configure(matrix) {
        for (let p = 0; p < matrix.length; p++) {
            for (let c = 0; c < matrix[p].length; c++) {
                const connection = this.connection_map.get(this.producers[p]).get(this.consumers[c])
                connection.active = !!matrix[p][c]
            }
        }
    }

    reset() {
        this.nodes.forEach(i => i.value = undefined)
        this.edges.forEach(i => i.value = undefined)
    }
    connect(from, to, isLeftInput = true) {
        const connection = new Edge(from, to)
        connection.active = true
        from.outputEdges.push(connection)
        if (isLeftInput) {
            to.leftInputEdges.push(connection)
        } else {
            to.rightInputEdges.push(connection)
        }
        this.edges.push(connection)
        return connection
    }

    execute(input, {
        onNodeValue,
        onEdgeValue,
        iterations_limit = 500,
    } = {}) {
        let edges = []
        let to_calculate_nodes = []
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].value = input[i]
            to_calculate_nodes.push(this.inputs[i])
        }

        let iteration = 0

        while ((to_calculate_nodes.length !== 0 || edges.length !== 0)) {
            ++iteration
            if (max_iteration > iterations_limit) {
                throw new Error('Too much processing time')
            }
            while (to_calculate_nodes.length > 0) {
                const activated_node = to_calculate_nodes.shift()

                let left_or_value = 0
                let right_or_value = 0
                for (const input_edge of activated_node.leftInputEdges) {
                    if (input_edge.value && input_edge.active) {
                        left_or_value = 1
                        break;
                    }
                }
                for (const input_edge of activated_node.rightInputEdges) {
                    if (input_edge.value && input_edge.active) {
                        right_or_value = 1
                        break;
                    }
                }

                let result_value;
                if (activated_node.type === 'nor') {
                    result_value = (left_or_value | right_or_value) === 0 ? 1 : 0
                } else if (activated_node.type === 'output') {
                    result_value = (left_or_value | right_or_value)
                } else if (activated_node.type === 'input') {
                    result_value = activated_node.value
                }

                const previous_value = activated_node.value
                activated_node.value = result_value
                if (onNodeValue) {
                    onNodeValue(this.nodes.indexOf(activated_node), result_value)
                }
                if (result_value !== previous_value || activated_node.type === 'input') {
                    for (const output_edge of activated_node.outputEdges) {
                        if (output_edge.active && output_edge.value !== result_value && !edges.includes(output_edge)) {
                            output_edge.value = result_value
                            if (onEdgeValue) {
                                onEdgeValue(this.nodes.indexOf(output_edge.from), this.nodes.indexOf(output_edge.to), result_value)
                            }
                            edges.push(output_edge)
                        }
                    }
                }
            }
            while (edges.length > 0) {
                const edge = edges.shift()
                if (edge.active && !to_calculate_nodes.includes(edge.to)) {
                    to_calculate_nodes.push(edge.to)
                }
            }

        }

        return this.outputs.map(e => e.value)
    }

    addNor() {
        const node = new Node('nor')
        this.nors.push(node)
        return node
    }

    addOutput() {
        const node = new Node('output')
        this.outputs.push(node)
        return node
    }
}


export class Node {
    type
    value
    leftInputEdges = []
    rightInputEdges = []
    outputEdges = []
    constructor(type) {
        this.type = type
    }
}

class Edge {
    from
    to
    active
    value

    constructor(from, to) {
        this.from = from
        this.to = to
    }
}


export const norExecutor = new Executor()