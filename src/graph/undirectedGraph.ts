import { createDirectedGraph } from './directedGraph';
import { Vertex, Edge, Graph } from './graph';
import { createSequentialIdGenerator, IdGenerator } from './idGenerator';

export const createUndirectedGraph = <VertexProps, EdgeProps>(
    idGenerator: IdGenerator = createSequentialIdGenerator()
) => {
    type VertexType = Vertex<VertexProps, EdgeProps>;
    type EdgeType = Edge<VertexProps, EdgeProps>;

    const baseGraph = createDirectedGraph<VertexProps, EdgeProps>(idGenerator);

    const graph: Graph<VertexType, EdgeType> = {
        ...baseGraph,
        addEdge: (from: VertexType, to: VertexType, props: EdgeProps) => {
            const edge = { ...props, from, to };
            from.edges.push(edge);
            to.edges.push(edge);
            return edge;
        },
        deleteEdge: (edge: EdgeType) => {
            baseGraph.deleteEdge(edge);
            edge.to = edge.from;
            baseGraph.deleteEdge(edge);
        },
        followEdge: (vertex: VertexType, edge: EdgeType): VertexType => {
            return edge.to === vertex ? edge.from : edge.to;
        },
    };

    return graph;
};
