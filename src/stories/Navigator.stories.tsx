import React from 'react'
import { Cytoscape } from '../components/Cytoscape'
import './scss/index.scss'

export default {
    title: 'Example/导航器',
    component: Cytoscape,
    parameters: {
        actions: { disable: true }
    }
}

const defaultElements = {
    nodes: [
        { group: 'nodes', data: { id: '1', label: 'node1' }, position: { x: 0, y: 0 } },
        { group: 'nodes', data: { id: '2', label: 'node2' }, position: { x: 100, y: 0 } },
        { group: 'nodes', data: { id: '3', label: 'node3' }, position: { x: 200, y: 0 } }
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

export const noNavigator = () => {
    return (
        <div className="simple-demo">
            <Cytoscape elements={defaultElements} navigator={false} />
        </div>
    )
}
noNavigator.storyName = '不显示导航器'
