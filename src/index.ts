import p5 from 'p5';
import { createGraphOfGrid } from './graph/graphOfGrid';

new p5((p: p5) => {
    const graph = createGraphOfGrid({ xSize: 2, ySize: 2 });

    for (const vertex of graph.vertices) {
        console.log(`vertex (${vertex.x}, ${vertex.y}) connects to`);
        for (const edge of vertex.edges) {
            const connectedVertex = graph.followEdge(vertex, edge);
            console.log(
                `    vertex (${connectedVertex.x}, ${connectedVertex.y})`
            );
        }
    }

    p.setup = () => {
        p.ellipse(0.5 * p.width, 0.5 * p.height, 0.9 * p.width, 0.9 * p.height);
    };
});
