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

export const event = ({ className, onInit, onUpdate, onClick, onDblClick, onCxtTap }) => {
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
        onUpdate(elements)
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Cytoscape
                className={className}
                onUpdate={handleUpdate}
                onInit={cy => onInit(cy.json())}
                onClick={(event, eventFrom) => onClick(event, eventFrom)}
                onDblClick={(event, eventFrom) => onDblClick(event, eventFrom)}
                onCxtTap={(event, eventFrom) => onCxtTap(event, eventFrom)}
                elements={elements}
            />
        </div>
    )
}

export default {
    title: 'Example/事件',
    component: event,
    argTypes: {
        onInit: { action: 'onInit', control: false },
        onUpdate: { action: 'onUpdate', control: false },
        onClick: { action: 'onClick', control: false },
        onDblClick: { action: 'onDblClick', control: false },
        onCxtTap: { action: 'onCxtTap', control: false },
        className: { control: 'text' }
    }
}
