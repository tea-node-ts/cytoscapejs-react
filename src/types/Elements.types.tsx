interface INodeData {
    id: string
    parent?: string
    [key: string]: any
}

interface IEdgeData {
    id: string
    source: string
    target: string
    [key: string]: any
}

export interface IPosition {
    x: number
    y: number
}

export interface INode {
    group: string
    data: INodeData
    position?: IPosition
    renderedPosition?: IPosition
    selected?: boolean
    selectable?: boolean
    locked?: boolean
    grabbable?: boolean
    pannable?: boolean
    classes?: Array<string> | string
}

export interface IEdge {
    group: string
    data: IEdgeData
    pannable?: boolean
    classes?: Array<string> | string
}

export interface IElements {
    nodes: Array<INode>
    edges?: Array<IEdge>
}
