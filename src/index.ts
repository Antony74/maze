import p5 from 'p5';
import { createGraphOfGrid } from './graph/graphOfGrid';
import { createDepthFirstSearch } from './graph/depthFirstSearch';
import { Visitable } from './graph/graph';
import { shuffle } from './shuffle';

type MazeEdgeProps = { wall: boolean };

new p5((p: p5) => {
    const xSize = 10;
    const ySize = 10;

    const line = (from: p5.Vector, to: p5.Vector) =>
        p.line(from.x, from.y, to.x, to.y);

    const { graph, grid } = createGraphOfGrid<Visitable, MazeEdgeProps>({
        xSize,
        ySize,
        initialVertexProps: { visited: false },
        initialEdgeProps: { wall: true },
    });

    for (const vertex of graph.vertices) {
        shuffle(vertex.edges);
    }

    const search = createDepthFirstSearch(
        grid[0][0]!,
        graph,
        (_vertex, edge) => {
            edge.wall = false;
            p.loop();
        }
    );

    const getVertexPosition = (xIndex: number, yIndex: number) => {
        const x = p.map(xIndex, -2, xSize + 1, 0, p.width);
        const y = p.map(yIndex, -2, ySize + 1, 0, p.height);
        return new p5.Vector(x, y);
    };

    p.setup = () => {
        p.ellipseMode(p.RADIUS);
        p.createCanvas(300, 300);
    };

    p.draw = () => {
        p.background(255);

        for (let y = 0; y < ySize; ++y) {
            for (let x = 0; x < xSize; ++x) {
                const vertex = grid[x][y];
                if (vertex) {
                    const vertexPosition = getVertexPosition(x, y);

                    if (vertex.visited) {
                        p.fill(255, 0, 0);
                    } else {
                        p.fill(0, 255, 255);
                    }

                    p.noStroke();
                    p.ellipse(vertexPosition.x, vertexPosition.y, 5);
                    p.stroke(0);

                    const leftVertex = (grid[x - 1] ?? [])[y];
                    const rightVertex = (grid[x + 1] ?? [])[y];
                    const upVertex = (grid[x] ?? [])[y - 1];
                    const downVertex = (grid[x] ?? [])[y + 1];

                    const leftEdge = vertex.edges.find(
                        (edge) => graph.getDirection(vertex, edge) === 'left'
                    );

                    const rightEdge = vertex.edges.find(
                        (edge) => graph.getDirection(vertex, edge) === 'right'
                    );

                    const upEdge = vertex.edges.find(
                        (edge) => graph.getDirection(vertex, edge) === 'up'
                    );

                    const downEdge = vertex.edges.find(
                        (edge) => graph.getDirection(vertex, edge) === 'down'
                    );

                    if (!leftVertex || !leftEdge || leftEdge.wall) {
                        line(
                            getVertexPosition(x - 0.5, y - 0.5),
                            getVertexPosition(x - 0.5, y + 0.5)
                        );
                    }

                    if (!upVertex || !upEdge || upEdge.wall) {
                        line(
                            getVertexPosition(x - 0.5, y - 0.5),
                            getVertexPosition(x + 0.5, y - 0.5)
                        );
                    }

                    if (!rightVertex && (!rightEdge || rightEdge.wall)) {
                        line(
                            getVertexPosition(x + 0.5, y - 0.5),
                            getVertexPosition(x + 0.5, y + 0.5)
                        );
                    }

                    if (!downVertex && (!downEdge || downEdge.wall)) {
                        line(
                            getVertexPosition(x - 0.5, y + 0.5),
                            getVertexPosition(x + 0.5, y + 0.5)
                        );
                    }
                }
            }
        }

        p.noLoop();
    };

    p.keyPressed = () => {
        search.step();
    };
});
