import { IElement } from './network'



let warning_printed = false

export const render_graph_async = (elements: Set<IElement>) => new Promise(resolve => {

    requestAnimationFrame(() => {
        render_graph(elements)
        setTimeout(() => {
            resolve()
        }, 1000)
    })
})
export const render_graph = (elements: Set<IElement>) => {
    if (typeof document === 'undefined') {
        if (!warning_printed) {
            console.warn("Can't render graph, DOM API is not supported by environment")
        }
        return
    }
    const graphContainer = document.createElement('div')

    const rootContainer: HTMLDivElement = document.getElementById('root') as HTMLDivElement
    rootContainer.innerHTML = ''
    rootContainer.appendChild(graphContainer)
    let id = 0;

    const nodes = Array.from(elements).map(e => ({
        id: e.id,
        label: `${e.type}#${e.id}`,
        original: e
    }))

    const edges: any[] = []

    for (const node of nodes) {
        const inputs = node.original.inputs
        for (let i = 0; i < inputs.length; i++) {
            const input_set = inputs[i]
            for (const incoming_connection of input_set) {
                const from_node = nodes.find(n => n.original === incoming_connection.from)
                edges.push({
                    id: id++,
                    from: from_node?.id,
                    to: node.id,
                    color: 'black',
                    arrows: {
                        to: { enabled: true, scaleFactor: 1, type: "arrow" },
                    },
                    label: `${from_node?.original.outputs.findIndex(o => o.has(incoming_connection))}-${i}`
                })
            }
        }
    }
    // @ts-ignore
    const visNodes = new vis.DataSet(nodes)
    // @ts-ignore
    const visEdges = new vis.DataSet(edges)
    // @ts-ignore
    const network = new vis.Network(graphContainer, { nodes: visNodes, edges: visEdges }, {
        configure: { enabled: false },
        // layout: {
        //     hierarchical: {
        //         direction: 'DU'
        //     },
        // },
    });


}

