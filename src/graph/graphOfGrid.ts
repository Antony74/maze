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

export type GridType<VertexProps, EdgeProps = {}> = (
    | Vertex<VertexProps & GridVertexProps, EdgeProps>
    | undefined
)[][];

export type GridGraphType<VertexProps, EdgeProps = {}> = Graph<
    VertexProps & GridVertexProps,
    EdgeProps
> & {
    getDirection: (
        from: Vertex<VertexProps & GridVertexProps, EdgeProps>,
        edge: Edge<VertexProps & GridVertexProps, EdgeProps>
    ) => 'up' | 'down' | 'left' | 'right' | undefined;
};

export type GridAndGraph<VertexProps, EdgeProps = {}> = {
    grid: GridType<VertexProps, EdgeProps>;
    graph: GridGraphType<VertexProps, EdgeProps>;
};

export const createGraphOfGrid = <VertexProps, EdgeProps = {}>(
    props: GraphOfGridProps<VertexProps, EdgeProps>
): GridAndGraph<VertexProps, EdgeProps> => {
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

    const graph: GridGraphType<VertexProps, EdgeProps> = {
        ...baseGraph,
        getDirection: (
            from,
            edge
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

    const grid: GridType<VertexProps, EdgeProps> = Array.from({
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
