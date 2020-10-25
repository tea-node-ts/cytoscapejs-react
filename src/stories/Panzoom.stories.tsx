import React from 'react'
import { Cytoscape } from '../components/Cytoscape'
import { INode, IEdge } from '../types/Elements.types'
import './scss/index.scss'

export default {
    title: 'Example/缩放栏',
    component: Cytoscape,
    parameters: {
        actions: { disable: true }
    }
}

interface IProps {
    elements: Array<INode | IEdge>
    panzoom?: boolean | unknown
}

const defaultElements = {
    nodes: [
        { group: 'nodes', data: { id: 'a', label: 'apple' }, position: { x: 0, y: 0 } },
        { group: 'nodes', data: { id: 'b', label: 'banana' }, position: { x: 100, y: 0 } },
        { group: 'nodes', data: { id: 'c', label: 'cherry' }, position: { x: 200, y: 0 } }
    ]
}

export const Default = () => {
    return (
        <div className="default-demo">
            <Cytoscape elements={defaultElements} />
        </div>
    )
}
Default.storyName = '默认'
Default.args = {
    elements: defaultElements
}

export const noPanzoom = () => {
    return (
        <div className="simple-demo">
            <Cytoscape elements={defaultElements} panzoom={false} />
        </div>
    )
}
noPanzoom.args = {
    elements: defaultElements,
    panzoom: false
}
noPanzoom.storyName = '不显示缩放栏'

export const small = () => {
    return (
        <div className="simple-demo">
            <Cytoscape elements={defaultElements} panzoom={{ mode: 'small' }} />
        </div>
    )
}
small.storyName = '精简模式'
