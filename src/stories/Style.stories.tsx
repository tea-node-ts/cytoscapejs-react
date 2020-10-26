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

const style = {
    core: {
        selectionBoxColor: '#edf0f3'
    },
    node: {
        width: '33px',
        height: '33px',
        shape: 'ellipse',
        borderWidth: '3px',
        borderOpacity: 1,
        borderColor: '#3a9caa',
        backgroundColor: function (ele) {
            return ele.data('color') ? ele.data('color') : '#3a9caa'
        },
        backgroundOpacity: 1,
        backgroundRepeat: 'no-repeat',
        content: 'data(label)',
        color: '#707070',
        fontFamily: 'Microsoft Yahei',
        fontSize: '12px',
        textHalign: 'center',
        textValign: 'bottom',
        textWrap: 'wrap',
        backgroundImageCrossorigin: 'anonymous',
        textMarginY: '8px',
        overlayColor: '#000000',
        backgroundWidthRelativeTo: 'inner',
        backgroundHeightRelativeTo: 'inner',
        padding: '16px',
        minZoomedFontSize: '8px'
    }
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

    const handleUpdateData = () => {
        setElements({ nodes: elements.nodes.map(item => ({ ...item, data: { ...item.data, color: '#ff0000' } })) })
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>新增节点</Button>
            <Button onClick={handleUpdateData}>更新节点Color</Button>
            <Cytoscape global="cy" elements={elements} stylesheet={style} />
        </div>
    )
}
Primary.storyName = '自定义样式'

export default {
    title: 'Example/样式',
    component: Cytoscape,
    argTypes: {
        cy: { control: false },
        panzoom: { control: false },
        navigator: { control: false }
    }
}
