import p5 from 'p5';
import { createGraphOfGrid } from './graph/graphOfGrid';

type MazeEdgeProps = { wall: boolean };

new p5((p: p5) => {
    const xSize = 10;
    const ySize = 10;

    const line = (from: p5.Vector, to: p5.Vector) =>
        p.line(from.x, from.y, to.x, to.y);

    const { grid } = createGraphOfGrid<MazeEdgeProps>({
        xSize,
        ySize,
        initialEdgeProps: { wall: true },
    });

    const getVertexPosition = (xIndex: number, yIndex: number) => {
        const x = p.map(xIndex, -1, xSize, 0, p.width);
        const y = p.map(yIndex, -1, ySize, 0, p.height);
        return new p5.Vector(x, y);
    };

    p.setup = () => {
        p.ellipseMode(p.RADIUS);
        p.createCanvas(300, 300);
    };

    p.draw = () => {
        p.background(255);
        p.fill(0, 255, 255);

        for (let y = 0; y < ySize; ++y) {
            for (let x = 0; x < xSize; ++x) {
                const vertex = grid[x][y];
                if (vertex) {
                    const vertexPosition = getVertexPosition(x, y);
                    p.noStroke();
                    p.ellipse(vertexPosition.x, vertexPosition.y, 5);
                    p.stroke(0);

                    const leftVertex = (grid[x - 1] ?? [])[y];
                    const rightVertex = (grid[x + 1] ?? [])[y];

                    const leftEdgeIndex = vertex.directions.findIndex(
                        (direction) => direction === 'left'
                    );

                    const leftEdge = vertex.edges[leftEdgeIndex];

                    if (!leftVertex || !leftEdge || leftEdge.wall) {
                        line(
                            getVertexPosition(x - 0.5, y - 0.5),
                            getVertexPosition(x - 0.5, y + 0.5)
                        );
                    }
                }
            }
        }

        p.noLoop();
    };
});
