export class Vertex {
    value: string
    edges: Edge[]
    connect(connectionValue: string, anotherVertex: Vertex) {
        this.edges.push(new Edge(connectionValue, this, anotherVertex))
    }
}


export class Edge {

    value: string;
    from: Vertex;
    to: Vertex

    constructor(value: string, from: Vertex, to: Vertex) {
        this.value = value
        this.from = from
        this.to = to
    }
}

export class Graph {

    vertecies: Vertex[] = []
    edge: Edge[] = []
    
}