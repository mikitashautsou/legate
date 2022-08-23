

// create an array with nodes
// var nodes = new vis.DataSet([
//     { id: 1, label: 'Node 1' },
//     { id: 2, label: 'Node 2' },
//     { id: 3, label: 'Node 3' },
//     { id: 4, label: 'Node 4' },
//     { id: 5, label: 'Node 5' }
// ]);

// // create an array with edges
// var edges = new vis.DataSet([
//     { from: 1, to: 3, width: 2, color: 'orange' },
//     { from: 1, to: 2 },
//     { from: 2, to: 4 },
//     { id: 2, from: 2, to: 5 }
// ]);


// provide the data in the vis format
// var data = {
//     nodes: nodes,
//     edges: edges
// };
// var options = {};

// initialize your network!


// edges.update({ id: 2, color: 'red' })


export const render_graph = (connect_matrix, inputsCount, outputsCount, elementsCount) => {
    const graphContainer = document.createElement('div')

    const rootContainer = document.getElementById('root')
    rootContainer.appendChild(graphContainer)
    let id = 0
    const producers = []
    const consumers = []
    const edges = []
    const nors = []
    const nodes = []


    for (let i = 0; i < elementsCount; i++) {
        const nor = { id: id++, label: `NOR #${i + 1}`, shape: 'box' }
        nors.push(
            nor
        )
    }


    for (let i = 0; i < inputsCount; i++) {
        const input = { id: id++, label: `Input #${i + 1}`, shape: 'circle ' }
        producers.push(
            input
        )
        nodes.push(input)
    }
    producers.push(...nors)

    for (let i = 0; i < outputsCount; i++) {
        const output = { id: id++, label: `Output #${i + 1}` }
        consumers.push(
            { node: output }
        )
        nodes.push(output)
    }
    nodes.push(...nors)


    for (const nor of nors) {
        consumers.push({ node: nor, type: 'left' })
        consumers.push({ node: nor, type: 'right' })
    }

    for (let i = 0; i < inputsCount + elementsCount; i++) {
        for (let o = 0; o < outputsCount + elementsCount * 2; o++) {
            if (connect_matrix[i][o] === 1) {
                edges.push({
                    id: id++,
                    from: producers[i].id,
                    to: consumers[o].node.id,
                    color: consumers[o].type === 'left' ? 'red' : 'blue',
                    arrows: {
                        to: { enabled: true, scaleFactor: 1, type: "arrow" }
                    }
                })
            }
        }
    }


    const visNodes = new vis.DataSet(nodes)
    const visEdges = new vis.DataSet(edges)
    const network = new vis.Network(graphContainer, { nodes: visNodes, edges: visEdges }, { configure: { enabled: false } });

    return {
        updateNodeValue: (node_index, value) => {
            const node = nodes[node_index]
            let color = value === 0 ? 'black' : 'white'
            visNodes.update({ id: node.id, color })
        },
        updateEdgeValue: (from, to, value) => {
            const edge = edges.find(e => e.from === from && e.to === to)
            let color = value === 0 ? 'black' : 'white'
            visEdges.update({ id: edge.id, color })
        }
    }

}