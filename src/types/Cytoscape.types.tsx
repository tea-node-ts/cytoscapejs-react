import { IStyle } from './StyleSheet.types'
import { IElements, INode, IEdge, IPosition } from './Elements.types'
import { ICallbackProps } from './CallbackProps.types'
import { IPanzoomConfig } from './PanzoomConfig.types'
import { INavigatorConfig } from './NavigatorConfig.types'
import { IRenderingProps } from './RenderingProps.types'
import { IInteractionProps } from './InteractionProps.types'

interface ILayout {
    name: string
    [propName: string]: any
}

interface IEvents {
    [propName: string]: any
}

export interface ICytoscapeProps extends IRenderingProps, IInteractionProps, ICallbackProps {
    /**
     * 自定义样式
     */
    className?: string
    /**
     * 注册为全局变量，如果设置了此属性，那么可以将会把cytoscape实例注册为全局变量
     */
    global?: string
    /**
     * 布局设置。
     */
    layout?: ILayout

    /**
     * 是否对选中节点应用布局。true-对选中节点应用布局，如果没有选中，就对所有节点应用布局；false-对所有节点应用布局
     */
    layoutSelected?: boolean

    /**
     * 样式定义，json格式。详情可参考cytoscapejs官方文档（http://fe.mlamp.cn:3008/#style）
     */
    stylesheet?: IStyle

    zoom?: number
    pan?: IPosition

    elements: IElements

    /**
     * 是否显示缩放按钮
     */
    panzoom?: boolean | IPanzoomConfig

    /**
     * 是否显示导航器
     */
    navigator?: boolean | INavigatorConfig

    /**
     * 是否开启框选模式。设置为true时，开启框选模式，将忽略boxSelectionEnabled和userPanningEnabled的设置
     */
    boxSelect?: boolean

    /**
     * 图析插件，如果在此处注册了插件，需要在onDestory回调中调用相关插件的销毁方法
     */
    extensions?: Array<any>

    /**
     * 绑定图事件
     */
    events?: IEvents
}

export { INode, IEdge }
