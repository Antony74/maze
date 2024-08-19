import p5 from 'p5';

new p5((p: p5) => {
    p.setup = () => {
        p.ellipse(0.5 * p.width, 0.5 * p.height, 0.9 * p.width, 0.9 * p.height);
    };
});
