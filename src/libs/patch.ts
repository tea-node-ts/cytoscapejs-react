import isEqual from 'lodash/isEqual'
import fromPairs from 'lodash/fromPairs'
import differenceBy from 'lodash/differenceBy'
import { ICytoscapeProps } from '../types/Cytoscape.types'

let runningLayout

export const patch = (cy: any, prevProps: ICytoscapeProps, currentProps: ICytoscapeProps) => {
    let runLayout = false
    cy.batch(() => {
        const {
            elements: { nodes: prevNodes, edges: prevEdges },
            stylesheet: prevStylesheet,
            layout: prevLayout,
            boxSelect: prevBoxSelect,
            boxSelectionEnabled: prevBoxSelectEnabled,
            userPanningEnabled: prevUserPanningEnabled
        } = prevProps
        const {
            elements: { nodes, edges },
            stylesheet: currentStylesheet,
            layout: currentLayout,
            boxSelect,
            layoutSelected,
            boxSelectionEnabled = true,
            userPanningEnabled = true
        } = currentProps

        if (!isEqual(nodes, prevNodes)) {
            runLayout = patchElements(cy, prevNodes, nodes)
        }

        if (!isEqual(edges, prevEdges)) {
            patchElements(cy, prevEdges, edges)
        }

        if (!isEqual(prevStylesheet, currentStylesheet)) {
            patchStyle(cy, currentStylesheet)
        }

        if (prevBoxSelect !== boxSelect) {
            if (boxSelect) {
                cy.boxSelectionEnabled(true)
                cy.userPanningEnabled(false)
            } else {
                cy.boxSelectionEnabled(boxSelectionEnabled)
                cy.userPanningEnabled(userPanningEnabled)
            }
        } else if (boxSelect === false) {
            if (prevBoxSelectEnabled !== boxSelectionEnabled) {
                cy.boxSelectionEnabled(boxSelectionEnabled)
            }
            if (prevUserPanningEnabled !== userPanningEnabled) {
                cy.userPanningEnabled(userPanningEnabled)
            }
        }

        ;[
            // simple keys that can be patched directly (key same as fn name)
            'zoom',
            'minZoom',
            'maxZoom',
            'zoomingEnabled',
            'userZoomingEnabled',
            'pan',
            'panningEnabled',
            'autoungrabify',
            'autolock',
            'autounselectify'
        ].forEach(key => {
            if (currentProps[key] !== undefined && !isEqual(prevProps[key], currentProps[key])) {
                patchJson(cy, key, currentProps[key])
            }
        })

        if (runLayout || JSON.stringify(prevLayout) !== JSON.stringify(currentLayout)) {
            patchLayout(cy, currentLayout, layoutSelected)
        }
    })
}

const patchJson = (cy, key, val) => {
    cy[key](val)
}

export const patchLayout = (cy, layout, layoutSelected) => {
    if (layout != null) {
        if (runningLayout) {
            runningLayout.stop()
        }
        let layoutNodes
        const selectedNodes = cy.nodes(':selected')
        if (layoutSelected && selectedNodes.length > 0) {
            layoutNodes = selectedNodes.not(':locked')
        } else {
            layoutNodes = cy.nodes(':unlocked')
        }

        runningLayout = layoutNodes.layout(layout).run()
    }
}

const patchStyle = (cy, stylesheet) => {
    const style = cy.style()

    if (style == null) {
        return
    }

    const newStylesheet = []
    for (const [key, value] of Object.entries(stylesheet)) {
        newStylesheet.push({
            selector: key,
            style: value
        })
    }

    style.fromJson(newStylesheet).update()
}

const patchElements = (cy, eles1 = [], eles2 = []) => {
    const toAdd = []
    const toPatch = []
    const toRm = cy.collection()

    const eles1Map = fromPairs(eles1.map(item => [item.data.id, item]))

    eles2.forEach(ele2 => {
        const { id } = ele2.data
        const ele1 = eles1Map[id]
        if (ele1) {
            toPatch.push({ ele1, ele2 })
        } else {
            toAdd.push(ele2)
        }
    })

    differenceBy(eles1, eles2, 'data.id').forEach(item => {
        toRm.merge(cy.getElementById(item.data.id))
    })

    if (toRm.length > 0) {
        cy.remove(toRm)
    }

    if (toAdd.length > 0) {
        cy.add(toAdd)
    }

    toPatch.forEach(({ ele1, ele2 }) => patchElement(cy, ele1, ele2))

    return toAdd.length > 0
}

const patchElement = (cy, ele1, ele2) => {
    const { id } = ele2.data
    const cyEle = cy.getElementById(id)
    const patch = {}
    const jsonKeys = ['data', 'position', 'selected', 'selectable', 'locked', 'grabbable', 'classes']

    jsonKeys.forEach(key => {
        const data2 = ele2[key]

        if (!isEqual(data2, ele1[key])) {
            patch[key] = data2
        }
    })

    if (Object.keys(patch).length > 0) {
        cyEle.json(patch)
    }
}
