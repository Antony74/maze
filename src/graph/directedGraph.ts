import { Vertex, Edge, Graph } from './graph';
import { createSequentialIdGenerator, IdGenerator } from './idGenerator';

export const createDirectedGraph = <VertexProps, EdgeProps>(
    idGenerator: IdGenerator = createSequentialIdGenerator()
) => {
    type VertexType = Vertex<VertexProps, EdgeProps>;
    type EdgeType = Edge<VertexProps, EdgeProps>;

    type VertexWithId = VertexType & { id: string };

    const vertices = new Map<string, VertexWithId>();

    const graph: Graph<VertexType, EdgeType> = {
        addVertex: (props: VertexProps): VertexType => {
            const id = idGenerator.getId();
            const vertex = { ...props, id, edges: [] };
            vertices[id] = vertex;
            return vertex;
        },
        deleteVertex: (vertex: VertexWithId) => {
            vertices.delete(vertex.id);
        },
        addEdge: (from: VertexType, to: VertexType, props: EdgeProps) => {
            const edge = { ...props, from, to };
            from.edges.push(edge);
            return edge;
        },
        deleteEdge: (edge: EdgeType) => {
            edge.from.edges.filter((e) => e !== edge);
        },
        followEdge: (_vertex: VertexType, edge: EdgeType): VertexType => {
            return edge.to;
        },
        get vertices(): IterableIterator<Readonly<VertexType>> {
            return vertices.values();
        },
    };

    return graph;
};
