import { Edge, Graph, Search, Vertex, Visitable, VisitFunction } from './graph';

export const depthFirstSearch = <VertexProps extends Visitable, EdgeProps>(
    startVertex: Vertex<VertexProps, EdgeProps>,
    graph: Graph<VertexProps, EdgeProps>,
    visit: VisitFunction<VertexProps, EdgeProps>
) => {
    const search = createDepthFirstSearch(startVertex, graph, visit);
    while (search.step() === true) {}
};

export const createDepthFirstSearch = <
    VertexProps extends Visitable,
    EdgeProps
>(
    startVertex: Vertex<VertexProps, EdgeProps>,
    graph: Graph<VertexProps, EdgeProps>,
    visit: VisitFunction<VertexProps, EdgeProps>
): Search => {
    type VertexType = Vertex<VertexProps, EdgeProps>;

    const stack: VertexType[] = [startVertex];
    const top = () => stack[stack.length - 1];

    startVertex.visited = true;

    const depthFirstSearch = {
        step: (): boolean => {
            if (!stack.length) {
                return false;
            }

            const currentVertex = top();

            for (const edge of currentVertex.edges) {
                const nextVertex = graph.followEdge(currentVertex, edge);
                if (nextVertex.visited === false) {
                    nextVertex.visited = true;
                    stack.push(nextVertex);
                    return visit(nextVertex, edge);
                }
            }

            stack.pop();
            return depthFirstSearch.step();
        },
    };

    return depthFirstSearch;
};
