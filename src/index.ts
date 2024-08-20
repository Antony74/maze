import p5 from 'p5';
// import { createVisitableGraph } from './graph';


new p5((p: p5) => {
    // createVisitableGraph();

    p.setup = () => {
        p.ellipse(0.5 * p.width, 0.5 * p.height, 0.9 * p.width, 0.9 * p.height);
    };
});
