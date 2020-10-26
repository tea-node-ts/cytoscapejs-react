import React from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import cytoscape from 'cytoscape'
import panzoom from 'cytoscape-panzoom' // 缩放
import navigator from 'cytoscape-navigator' // 导航器
import { ICytoscapeProps } from '../types/Cytoscape.types'
import { patch } from '../libs/patch'
import Navigator from './Navigator'
import { bindEvent } from '../libs/bindEvent'
import defaultPanzoomConfig from '../configs/panzoomConfig'
import defaultNavigatorConfig from '../configs/navigatorConfig'
import { defaultProps } from '../configs/defaultProps'
import '../scss/index.scss'

panzoom(cytoscape)
navigator(cytoscape)

export class Cytoscape extends React.Component<ICytoscapeProps> {
    private static defaultProps = { ...defaultProps, panzoom: true, navigator: true, extensions: [] }

    private _id: string
    public cy: any
    private _cyContainerRef: React.RefObject<HTMLDivElement>
    private _navigator: any
    private _cyCachedData: React.RefObject<ICytoscapeProps>

    constructor(props: ICytoscapeProps) {
        super(props)
        this._id = uuidv4()
        this._cyContainerRef = React.createRef()
        this._cyCachedData = React.createRef()
    }

    componentDidMount(): void {
        const {
            elements,
            layout,
            stylesheet,
            global,
            panzoom: panzoomConfig,
            navigator: navigatorConfig,
            onInit,
            extensions,
            events,
            ...otherProps
        } = this.props

        if (extensions.length > 0) {
            extensions.forEach(extension => {
                cytoscape.use(extension)
            })
        }

        const newStylesheet = []
        for (const [key, value] of Object.entries(stylesheet)) {
            newStylesheet.push({
                selector: key,
                style: value
            })
        }

        const cy = (this.cy = new cytoscape({
            container: this._cyContainerRef.current,
            elements,
            layout,
            style: newStylesheet,
            ...otherProps
        }))

        if (panzoomConfig) {
            this.initPanzoom(panzoomConfig)
        }

        if (navigatorConfig) {
            this.initNavigator(navigatorConfig)
        }
        if (global) {
            window[global] = cy
        }

        // 绑定图析中的事件
        bindEvent({
            cy,
            events,
            callback: {
                ...otherProps
            }
        })

        onInit && onInit(cy)
    }

    componentDidUpdate(prevProps): void {
        const cy = this.cy
        patch(cy, prevProps, this.props)
    }

    componentWillUnmount() {
        const { panzoom, onDestroy } = this.props
        if (!this.cy) return
        if (panzoom) {
            this.cy.panzoom('destroy')
        }
        if (this._navigator) {
            this._navigator.destroy()
        }

        if (onDestroy) {
            onDestroy(this.cy)
        }
        this.cy.destroy()
    }

    initPanzoom = panzoom => {
        const { minZoom, maxZoom } = this.props
        const { sliderHandleIcon, zoomInIcon, zoomOutIcon, ...customOthers } = panzoom
        const {
            sliderHandleIcon: defaultSliderHandleIcon,
            zoomInIcon: defaultZoomInIcon,
            zoomOutIcon: defaultZoomOutIcon,
            ...others
        } = defaultPanzoomConfig
        const config = {
            ...others,
            ...customOthers,
            sliderHandleIcon: `${defaultSliderHandleIcon} ${sliderHandleIcon}`,
            zoomInIcon: `${defaultZoomInIcon} ${zoomInIcon}`,
            zoomOutIcon: `${defaultZoomOutIcon} ${zoomOutIcon}`,
            minZoom,
            maxZoom
        }
        this.cy.panzoom(config)
    }

    initNavigator = navigatorConfig => {
        const customConfig = navigatorConfig !== true && navigatorConfig
        const config = { ...defaultNavigatorConfig, ...customConfig, container: `#navigator-${this._id}` }
        this._navigator = this.cy.navigator(config)
    }

    render(): JSX.Element | null {
        const { className, navigator: navigatorConfig, panzoom: panzoomConfig = false } = this.props

        let cls = ''

        if (typeof panzoomConfig === 'object') {
            const { mode, size } = panzoomConfig
            if (mode) {
                cls += ` pan-zoom-${mode}`
            }
            if (size) {
                cls += ` pan-zoom-${size}`
            }
        }

        return (
            <div className={classNames('cr-cytoscape', className, cls)}>
                <div ref={this._cyContainerRef} className="cr-cytoscape-container" />
                {navigatorConfig && <Navigator parentId={this._id} {...navigatorConfig} />}
            </div>
        )
    }
}
