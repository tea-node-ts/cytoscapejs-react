export interface IInteractionProps {
    minZoom?: number
    maxZoom?: number
    zoomingEnabled?: boolean
    userZoomingEnabled?: boolean
    panningEnabled?: boolean
    userPanningEnabled?: boolean
    /**
     * 是否允许多选，boxSelect设置为false时，此属性生效。当此属性设置为true时，允许多选，多选方式由userPanningEnabled决定。如果userPanningEnabled为true，需要按下shift或control、alt、command进行框选
     */
    boxSelectionEnabled?: boolean
    /**
     * 是否允许拖动画布
     */
    selectionType?: string
    touchTapThreshold?: number
    desktopTapThreshold?: number
    autolock?: boolean
    autoungrabify?: boolean
    autounselectify?: boolean
}
