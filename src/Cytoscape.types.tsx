export interface IEventProps {
  onInit?: (cy: cytoscape.Core) => void
  onDestroy?: (cy: cytoscape.Core) => void
}

export interface ICytoscapeProps extends cytoscape.CytoscapeOptions, IEventProps {
  /**
   * 自定义样式
   */
  className?: string

  /**
   * 注册为全局变量，如果设置了此属性，那么可以将会把cytoscape实例注册为全局变量
   */
  global?: string
}