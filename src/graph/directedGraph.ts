import { Vertex, Edge, Graph, Id } from './graph';
import { createSequentialIdGenerator, IdGenerator } from './idGenerator';

export const createDirectedGraph = <VertexProps, EdgeProps>(
    idGenerator: IdGenerator = createSequentialIdGenerator()
) => {
    type VertexType = Vertex<VertexProps, EdgeProps>;
    type EdgeType = Edge<VertexProps, EdgeProps>;

    type VertexWithId = Vertex<VertexProps & Id, EdgeProps>;

    const vertices = new Map<string, VertexWithId>();

    const graph: Graph<VertexProps, EdgeProps> = {
        addVertex: (props: VertexProps): VertexWithId => {
            const id = idGenerator.getId();
            const vertex: VertexWithId = { ...props, id, edges: [] };
            vertices.set(vertex.id, vertex);
            return vertex;
        },

        deleteVertex: (vertex: Id) => {
            vertices.delete(vertex.id);
        },

        addEdge: (from: VertexType, to: VertexType, props: EdgeProps) => {
            const edge = { ...props, from, to };
            edge.from.edges.push(edge);
            return edge;
        },

        deleteEdge: (edge: EdgeType) => {
            edge.from.edges.filter((e) => e !== edge);
        },

        followEdge: (_vertex: VertexType, edge: EdgeType): VertexType => {
            return edge.to;
        },

        get vertices(): IterableIterator<VertexType> {
            return vertices.values();
        },
    };

    return graph;
};
