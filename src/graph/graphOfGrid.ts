import { Edge, Graph, Vertex } from './graph';
import { createUndirectedGraph } from './undirectedGraph';

export type GridVertexProps = {
    x: number;
    y: number;
    directions: ('up' | 'down' | 'left' | 'right')[];
};

export type GridEdgeProps = {};

export type GridVertex = Vertex<GridVertexProps, GridEdgeProps>;
export type GridEdge = Edge<GridVertexProps, GridEdgeProps>;

export type GridGraph = Graph<GridVertexProps, GridEdgeProps>;

export type GraphOfGridProps = {
    graph?: GridGraph;
    xSize: number;
    ySize: number;
};

export const createGraphOfGrid = ({
    graph,
    xSize,
    ySize,
}: GraphOfGridProps): GridGraph => {
    graph = graph ?? createUndirectedGraph<GridVertexProps, GridEdgeProps>();

    const grid: GridVertex[][] = [];

    for (let y = 0; y < ySize; ++y) {
        const prevRow = y ? grid[grid.length - 1] : undefined;
        const currentRow: GridVertex[] = [];
        for (let x = 0; x < xSize; ++x) {
            const vertex = graph.addVertex({ x, y, directions: [] });
            const prevVertex = x
                ? currentRow[currentRow.length - 1]
                : undefined;
            if (prevVertex) {
                graph.addEdge(prevVertex, vertex, {});
                vertex.directions.push('left');
                prevVertex.directions.push('right');
            }
            if (prevRow) {
                const prevRowVertex = prevRow[x];
                graph.addEdge(prevRowVertex, vertex, {});
                vertex.directions.push('up');
                prevRowVertex.directions.push('down');
            }
            currentRow.push(vertex);
        }
        grid.push(currentRow);
    }

    return graph;
};
