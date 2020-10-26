import React, { useState } from 'react'
import { Button } from 'antd'
// // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import { Story } from '@storybook/react/types-6-0'
import { Cytoscape } from '../components/Cytoscape'
import d3Force from 'cytoscape-d3-force'
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

    const handleUpdate = ({ elements }) => {
        setElements(elements)
        console.log('render')
    }

    const layout = {
        name: 'random'
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onRender={handleUpdate} extensions={[d3Force]} layout={layout} />
        </div>
    )
}
Primary.storyName = 'random'

export const D3ForceLayout = () => {
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
D3ForceLayout.storyName = 'd3-force'

export const GridLayout = () => {
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

    const handleUpdate = ({ elements }) => {
        setElements(elements)
        console.log('render')
    }

    const layout = {
        name: 'grid'
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onRender={handleUpdate} extensions={[d3Force]} layout={layout} />
        </div>
    )
}
GridLayout.storyName = 'grid'

export const BreadthfirstLayout = () => {
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

    const handleUpdate = ({ elements }) => {
        setElements(elements)
        console.log('render')
    }

    const layout = {
        name: 'breadthfirst'
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onRender={handleUpdate} extensions={[d3Force]} layout={layout} />
        </div>
    )
}
BreadthfirstLayout.storyName = 'breadthfirst'

export const CircleLayout = () => {
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

    const handleUpdate = ({ elements }) => {
        setElements(elements)
        console.log('render')
    }

    const layout = {
        name: 'circle'
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape global="cy" elements={elements} onRender={handleUpdate} extensions={[d3Force]} layout={layout} />
        </div>
    )
}
CircleLayout.storyName = 'circle'

export default {
    title: 'Example/布局',
    component: Cytoscape,
    argTypes: {
        cy: { control: false },
        panzoom: { control: false },
        navigator: { control: false }
    }
}
