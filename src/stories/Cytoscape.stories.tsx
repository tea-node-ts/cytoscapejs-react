import React, { useState } from 'react'
import { Button } from 'antd'
// // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story } from '@storybook/react/types-6-0'
import { Cytoscape } from '../components/Cytoscape'
import './scss/index.scss'

const defaultElements = {
    nodes: [
        { group: 'nodes', data: { id: 'a', label: 'apple' }, position: { x: 0, y: 0 } },
        { group: 'nodes', data: { id: 'b', label: 'banana' }, position: { x: 100, y: 0 } },
        { group: 'nodes', data: { id: 'c', label: 'cherry' }, position: { x: 200, y: 0 } }
    ]
}

export const Primary = () => {
    const [elements, setElements] = useState(defaultElements)

    const handleClick = () => {
        setElements({
            ...elements,
            nodes: [
                ...elements.nodes,
                { group: 'nodes', data: { id: 'd', label: 'orange' }, position: { x: 100, y: 100 } }
            ]
        })
    }

    const handleUpdate = ({ elements }) => {
        setElements(elements)
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onUpdate={handleUpdate} selectionType="single" />
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
