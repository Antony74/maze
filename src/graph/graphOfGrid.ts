import { Edge, Graph, Id, Vertex } from './graph';
import { createUndirectedGraph } from './undirectedGraph';

export type GridVertexProps = {
    x: number;
    y: number;
};

export type GraphOfGridProps<VertexProps, EdgeProps> = {
    graph?: Graph<VertexProps & GridVertexProps, EdgeProps>;
    xSize: number;
    ySize: number;
    initialVertexProps: VertexProps;
    initialEdgeProps: EdgeProps;
    vertexFilterFunction?: (x: number, y: number) => boolean;
};

export const createGraphOfGrid = <VertexProps, EdgeProps = {}>(
    props: GraphOfGridProps<VertexProps, EdgeProps>
) => {
    type VertexType = Vertex<VertexProps & GridVertexProps & Id, EdgeProps>;
    type EdgeType = Edge<VertexProps & GridVertexProps & Id, EdgeProps>;

    const {
        xSize,
        ySize,
        initialVertexProps,
        initialEdgeProps,
        vertexFilterFunction,
    } = props;

    const baseGraph =
        props.graph ??
        createUndirectedGraph<VertexProps & GridVertexProps, EdgeProps>();

    const graph = {
        ...baseGraph,
        getDirection: (
            from: VertexType,
            edge: EdgeType
        ): 'up' | 'down' | 'left' | 'right' | undefined => {
            const to = graph.followEdge(from, edge);

            if (from.x < to.x) {
                return 'right';
            } else if (from.x > to.x) {
                return 'left';
            } else if (from.y < to.y) {
                return 'down';
            } else if (from.y > to.y) {
                return 'up';
            }
        },
    };

    const grid: (VertexType | undefined)[][] = Array.from({
        length: xSize,
    }).map(() => Array.from({ length: ySize }));

    for (let y = 0; y < ySize; ++y) {
        for (let x = 0; x < xSize; ++x) {
            if (vertexFilterFunction && vertexFilterFunction(x, y) === false) {
                continue;
            }

            const vertex = graph.addVertex({
                x,
                y,
                directions: [],
                ...initialVertexProps,
            });
            grid[x][y] = vertex;
            const prevVertex = x ? grid[x - 1][y] : undefined;

            if (prevVertex) {
                graph.addEdge(prevVertex, vertex, initialEdgeProps);
            }

            const prevRowVertex = y ? grid[x][y - 1] : undefined;
            if (prevRowVertex) {
                graph.addEdge(prevRowVertex, vertex, initialEdgeProps);
            }
        }
    }

    return { grid, graph };
};
