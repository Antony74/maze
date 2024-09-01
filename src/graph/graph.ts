export type Vertex<VertexProps, EdgeProps> = {
    edges: Edge<VertexProps, EdgeProps>[];
} & VertexProps;

export type Edge<VertexProps, EdgeProps> = {
    from: Vertex<VertexProps, EdgeProps>;
    to: Vertex<VertexProps, EdgeProps>;
} & EdgeProps;

export type Visitable = { visited: boolean };
export type Id = Readonly<{ id: string }>;

export type Graph<VertexProps, EdgeProps> = {
    addVertex: (props: VertexProps) => Vertex<VertexProps & Id, EdgeProps>;

    deleteVertex: (vertex: Id) => void;

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

    get vertices(): IterableIterator<Vertex<VertexProps, EdgeProps>>;
};
