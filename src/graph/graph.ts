export type Vertex<VertexProps, EdgeProps> = {
    edges: ({
        from: Vertex<VertexProps, EdgeProps>;
        to: Vertex<VertexProps, EdgeProps>;
    } & EdgeProps)[];
} & VertexProps;

export type Edge<VertexProps, EdgeProps> = {
    from: Vertex<VertexProps, EdgeProps>;
    to: Vertex<VertexProps, EdgeProps>;
} & EdgeProps;

export type Visitable = { visited: boolean };

export type Graph<VertexProps, EdgeProps> = {
    addVertex: (props: VertexProps) => Vertex<VertexProps, EdgeProps>;

    deleteVertex: (
        vertex: Vertex<VertexProps & { id: string }, EdgeProps>
    ) => void;

    addEdge: (
        from: Vertex<VertexProps, EdgeProps>,
        to: Vertex<VertexProps, EdgeProps>,
        props: EdgeProps
    ) => Edge<VertexProps, EdgeProps>;

    deleteEdge: (edge: Edge<VertexProps, EdgeProps>) => void;

    followEdge: (
        vertex: Vertex<VertexProps, EdgeProps>,
        edge: Edge<VertexProps, EdgeProps>
    ) => Vertex<VertexProps, EdgeProps>;

    get vertices(): IterableIterator<Readonly<Vertex<VertexProps, EdgeProps>>>;
};
