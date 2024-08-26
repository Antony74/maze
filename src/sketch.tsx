import p5 from 'p5';
import {
    createGraphOfGrid,
    GridGraphType,
    GridType,
} from './graph/graphOfGrid';
import { createDepthFirstSearch, Search } from './graph/depthFirstSearch';
import { Visitable } from './graph/graph';
import { shuffle } from './shuffle';
import { useEffect, useRef } from 'react';
import React from 'react';
import { Mode } from './mode';

export type SketchState = { mode: Mode; reset: boolean };

let sketchState: SketchState = { mode: Mode.plain, reset: true };

let stateChangedFunction = () => {};

export const setSketchState = (state: Partial<SketchState>) => {
    sketchState = { ...sketchState, ...state };
    stateChangedFunction();
    console.log(`setSketchState(${JSON.stringify(state, null, 4)})`);
};

type MazeVertexProps = Visitable;
type MazeEdgeProps = { wall: boolean };

const sketch = (p: p5) => {
    const xSize = 10;
    const ySize = 10;

    const line = (from: p5.Vector, to: p5.Vector) =>
        p.line(from.x, from.y, to.x, to.y);

    const getVertexPosition = (xIndex: number, yIndex: number) => {
        const x = p.map(xIndex, -2, xSize + 1, 0, p.width);
        const y = p.map(yIndex, -2, ySize + 1, 0, p.height);
        return new p5.Vector(x, y);
    };

    let graph: GridGraphType<MazeVertexProps, MazeEdgeProps> | undefined =
        undefined;

    let grid: GridType<MazeVertexProps, MazeEdgeProps> | undefined = undefined;
    let search: Search | undefined = undefined;

    p.setup = () => {
        p.ellipseMode(p.RADIUS);
        p.createCanvas(300, 300);
    };

    p.draw = () => {
        p.background(255);

        if (sketchState.reset) {
            sketchState.reset = false;

            const gridAndGraph = createGraphOfGrid<
                MazeVertexProps,
                MazeEdgeProps
            >({
                xSize,
                ySize,
                initialVertexProps: { visited: false },
                initialEdgeProps: { wall: true },
            });

            graph = gridAndGraph.graph;
            grid = gridAndGraph.grid;

            for (const vertex of graph.vertices) {
                shuffle(vertex.edges);
            }

            search = createDepthFirstSearch(
                grid[0][0]!,
                graph,
                (_vertex, edge) => {
                    edge.wall = false;
                    p.loop();
                }
            );

            if (sketchState.mode !== Mode.step) {
                while (search.step()) {}
            }
        }

        if (grid === undefined) {
            throw new Error('No grid');
        }

        for (let y = 0; y < ySize; ++y) {
            for (let x = 0; x < xSize; ++x) {
                const vertex = grid[x][y];
                if (vertex) {
                    const vertexPosition = getVertexPosition(x, y);

                    if (sketchState.mode === Mode.step) {
                        if (vertex.visited) {
                            p.fill(0, 255, 0, 192);
                        } else {
                            p.fill(200, 192);
                        }

                        p.noStroke();
                        p.ellipse(vertexPosition.x, vertexPosition.y, 5);
                        p.stroke(0);
                    }

                    const leftVertex = (grid[x - 1] ?? [])[y];
                    const rightVertex = (grid[x + 1] ?? [])[y];
                    const upVertex = (grid[x] ?? [])[y - 1];
                    const downVertex = (grid[x] ?? [])[y + 1];

                    const leftEdge = vertex.edges.find(
                        (edge) => graph?.getDirection(vertex, edge) === 'left'
                    );

                    const rightEdge = vertex.edges.find(
                        (edge) => graph?.getDirection(vertex, edge) === 'right'
                    );

                    const upEdge = vertex.edges.find(
                        (edge) => graph?.getDirection(vertex, edge) === 'up'
                    );

                    const downEdge = vertex.edges.find(
                        (edge) => graph?.getDirection(vertex, edge) === 'down'
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
        search?.step();
    };

    stateChangedFunction = () => {
        p.loop();
    };
};

export const Sketch = () => {
    const p5ContainerRef = useRef();

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        return () => {
            p5Instance.remove();
        };
    }, []);

    return <div className="App" ref={p5ContainerRef as any} />;
};
