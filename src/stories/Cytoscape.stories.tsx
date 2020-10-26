import React, { useState } from 'react'
import { Button } from 'antd'
import { Cytoscape } from '../components/Cytoscape'
import './scss/index.scss'

const defaultElements = {
    nodes: [
        { group: 'nodes', data: { id: '1', label: 'node1' }, position: { x: 0, y: 0 } },
        { group: 'nodes', data: { id: '2', label: 'node2' }, position: { x: 100, y: 0 } },
        { group: 'nodes', data: { id: '3', label: 'node3' }, position: { x: 200, y: 0 } }
    ]
}

export const Primary = () => {
    const [elements, setElements] = useState(defaultElements)

    const handleClick = () => {
        const nextId = elements.nodes.length + 1
        setElements({
            ...elements,
            nodes: [
                ...elements.nodes,
                {
                    group: 'nodes',
                    data: { id: nextId.toString(), label: `node${nextId}` },
                    position: { x: 100, y: 100 }
                }
            ]
        })
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} selectionType="single" />
        </div>
    )
}
Primary.storyName = '数据'

export default {
    title: 'Example/基本功能',
    component: Cytoscape,
    argTypes: {
        cy: { control: false },
        panzoom: { control: false },
        navigator: { control: false }
    }
}
