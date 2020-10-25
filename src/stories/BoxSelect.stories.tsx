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

export const Default = () => {
    const [boxSelect, setBoxSelect] = useState(false)

    const handleClick = () => {
        setBoxSelect(!boxSelect)
    }

    return (
        <div className="default-demo">
            <Button onClick={handleClick}>{boxSelect ? '关闭' : '开启'}框选</Button>
            <Cytoscape global="cy" elements={defaultElements} boxSelect={boxSelect} />
        </div>
    )
}
Default.storyName = '简单示例'
Default.argTypes = {
    boxSelectionEnabled: { control: false },
    userPanningEnabled: { control: false },
    boxSelect: { control: false }
}

export const Primary = props => {
    const { className, boxSelectionEnabled, boxSelect, userPanningEnabled } = props
    return (
        <div className="default-demo">
            <Cytoscape
                className={className}
                elements={defaultElements}
                boxSelect={boxSelect}
                boxSelectionEnabled={boxSelectionEnabled}
                userPanningEnabled={userPanningEnabled}
            />
        </div>
    )
}
Primary.storyName = 'Controls控制属性'

export default {
    title: 'Example/框选',
    // component: Default,
    argTypes: {
        className: {
            control: 'text',
            description: '样式',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' }
            }
        },
        boxSelect: {
            control: 'boolean',
            type: { name: 'boolean' },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            },
            description:
                '是否开启框选模式。设置为true时，开启框选模式，将忽略boxSelectionEnabled和userPanningEnabled的设置'
        },
        boxSelectionEnabled: {
            control: 'boolean',
            type: { name: 'boolean' },
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true }
            },
            description:
                '是否允许多选，boxSelect设置为false时，此属性生效。当此属性设置为true时，允许多选，多选方式由userPanningEnabled决定。如果userPanningEnabled为true，需要按下shift或control、alt、command进行框选'
        },
        userPanningEnabled: {
            control: 'boolean',
            type: { name: 'boolean' },
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true }
            },
            description: '是否允许拖动画布'
        }
    }
}
