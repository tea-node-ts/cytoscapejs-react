import React from 'react'
import classNames from 'classnames'
import cytoscape from 'cytoscape'
import { ICytoscapeProps } from './Cytoscape.types'
import './Cytoscape.scss'

export class Cytoscape extends React.Component<ICytoscapeProps> {
  public cy: cytoscape.Core
  private _cyContainerRef: React.RefObject<HTMLDivElement>

  constructor(props: ICytoscapeProps) {
    super(props)
    this._cyContainerRef = React.createRef()
  }

  componentDidMount() {
    const {
      elements,
      layout,
      global,
      onInit
    } = this.props;

    const cy = (this.cy = cytoscape({
      container: this._cyContainerRef.current,
      elements,
      layout,
    }))

    if (global) {
      window[global] = cy
    }

    onInit && onInit(cy)
  }

  componentDidUpdate(prevProps: ICytoscapeProps): void {
    console.log('didupdate: ',  prevProps);
  }

  componentWillUnmount() {
    const { onDestroy } = this.props;

    if (!this.cy) return

    if (onDestroy) {
      onDestroy(this.cy)
    }

    this.cy.destroy()
  }

  render(): JSX.Element | null {
    const { className } = this.props
    return (
      <div className={classNames('cr-container', className)}>
          <div ref={this._cyContainerRef} style={{ height: '100%' }} />
      </div>
    )
  }
}