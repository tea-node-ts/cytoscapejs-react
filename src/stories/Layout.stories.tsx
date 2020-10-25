import React, { useState } from 'react'
import { Button } from 'antd'
// // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story } from '@storybook/react/types-6-0'
import { Cytoscape } from '../components/Cytoscape'
import d3Force from 'cytoscape-d3-force'
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
        console.log('render')
    }

    const layout = {
        name: 'd3-force',
        animate: true,
        fixedAfterDragging: false,
        linkId: function id(d) {
            return d.id
        },
        linkDistance: 80,
        manyBodyStrength: -300,
        tick(progress) {
            console.log('progress - ', progress)
        },
        randomize: false,
        infinite: true
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onRender={handleUpdate} extensions={[d3Force]} layout={layout} />
        </div>
    )
}
Primary.storyName = 'd3-force'

export default {
    title: 'Example/布局',
    component: Cytoscape,
    argTypes: {
        cy: { control: false },
        panzoom: { control: false },
        navigator: { control: false }
    }
}
