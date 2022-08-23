
const get_edge_color_by_value = (value: number) => {

    if (value === 1) {
        return 'red'
    } else if (value === 0) {
        return 'blue'
    } else if (value === -1) {
        return 'black'
    }
    throw new Error('invalid edge value')
}

export const render_graph_history = async (history_content: string, step_by_step = false) => {

    const instructions = history_content.split('\n').map(e => e.trim()).filter(e => !!e)
    const graphContainer = document.createElement('div')

    const rootContainer: HTMLDivElement = document.getElementById('root') as HTMLDivElement
    rootContainer.appendChild(graphContainer)

    // @ts-ignore
    const nodes = new vis.DataSet([])
    // @ts-ignore
    const edges = new vis.DataSet([])

    window.nodes = nodes

    // @ts-ignore
    const network = new vis.Network(graphContainer, { nodes, edges }, {
        configure: { enabled: false },
        // layout: {
        //     hierarchical: {
        //         direction: 'DU'
        //     },
        // },
    });

    const pauses = []
    window.addEventListener('keypress', (ev) => {
        if (ev.key === ' ' && pauses.length > 0) {
            pauses.shift()()
        }
    })
    console.log({ instructions })

    let init_complete = false
    for (const instruction of instructions) {
        const [directive, ...args] = instruction.split(' ')

        if (directive === 'INIT_COMPLETE') {
            init_complete = true
        } else if (directive === 'INPUTS') {
            const inputs_amount = parseInt(args[0])

            for (let i = 0; i < inputs_amount; i++) {
                nodes.add({
                    id: nodes.length,
                    label: `I#${nodes.length}`
                })
            }
        } else if (directive === 'OUTPUTS') {
            const outputs = parseInt(args[0])

            for (let i = 0; i < outputs; i++) {
                nodes.add({
                    id: nodes.length,
                    label: `O#${nodes.length}`
                })
            }
        } else if (directive === 'NORS') {
            const outputs = parseInt(args[0])

            for (let i = 0; i < outputs; i++) {
                nodes.add({
                    id: nodes.length,
                    label: `NOR#${nodes.length}`
                })
            }
        } else if (directive === 'CONNECTION') {
            const [from, to, type] = args.map(e => parseInt(e))
            edges.add({
                id: edges.length,
                from,
                to,
                type,
                color: get_edge_color_by_value(0),
                arrows: {
                    to: { enabled: true, scaleFactor: 1, type: "arrow" },
                },
                label: `${type === 0 ? 'left' : type === 1 ? 'right' : 'error'}`
            })
        } else if (directive === 'CONNECTION_VALUE') {
            const [from, to, type, value] = args.map(e => parseInt(e))
            let target_edge;
            for (let edge_idx = 0; edge_idx < edges.length; edge_idx += 1) {
                if (edges.get(edge_idx).from === from && edges.get(edge_idx).to === to && edges.get(edge_idx).type === type) {
                    target_edge = edges.get(edge_idx)
                }
            }
            if (!target_edge) {
                continue
            }
            target_edge.color = get_edge_color_by_value(value)
            edges.update(target_edge)
        } else if (directive === 'NODE_VALUE') {
            const [id, value] = args.map(e => parseInt(e))
            let target_node;
            for (let node_idx = 0; node_idx < nodes.length; node_idx += 1) {
                if (nodes.get(node_idx).id === id) {
                    target_node = nodes.get(node_idx)
                }
            }
            if (!target_node) {
                continue
            }
            target_node.color = get_edge_color_by_value(value)
            nodes.update(target_node)
        }
        console.log('PARSED: ', instruction)
        if (step_by_step && init_complete) {
            await new Promise(resolve => {
                pauses.push(resolve)
            })
        }
    }


}

