import { Graph, Vertex, Visitable } from './graph';

export const createDepthFirstSearch = <
    VertexProps extends Visitable,
    EdgeProps
>(
    startVertex: Vertex<VertexProps, EdgeProps>,
    graph: Graph<VertexProps, EdgeProps>,
    visit: (vertex: Vertex<VertexProps, EdgeProps>) => void
) => {
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
                    visit(nextVertex);
                    nextVertex.visited = true;
                    stack.push(nextVertex);
                    return true;
                }
            }

            stack.pop();
            return depthFirstSearch.step();
        },
    };

    return depthFirstSearch;
};
