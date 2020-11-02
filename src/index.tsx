import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import cytoscape from 'cytoscape';
import navigator from 'cytoscape-navigator';
import panzoom from 'cytoscape-panzoom';
import NavigatorComponent from './components/NavigatorComponent';

import {
  CytoscapeComponentProps,
  Navigator,
  Panzoom,
} from './types/CytoscapeComponentProps.types';

import { patch } from './libs/patch';
import { bindEvents } from './libs/bindEvents';

import defaultProps from './configs/defaultProps';
import defaultNavigatorOptions from './configs/defaultNavigatorOptions';
import defaultPanzoomOptions from './configs/defeaultPanzoomOptions';
import './scss/index.scss';

navigator(cytoscape);
panzoom(cytoscape);

export class CytoscapeComponent extends React.Component<
  CytoscapeComponentProps
> {
  static defaultProps = { ...defaultProps };
  private _id: string;
  private cy: any;
  private _cytoscapeRef: React.RefObject<HTMLDivElement>;

  constructor(props: CytoscapeComponentProps) {
    super(props);
    this._id = uuidv4();
    this._cytoscapeRef = React.createRef();
  }

  componentDidMount() {
    const {
      global,
      elements,
      stylesheets,
      layout,
      events,
      onInit,
      extensions,
      navigator: navigatorOptions,
      panzoom: panzoomOptions,
      ...otherProps
    } = this.props;

    // add extensions
    if (extensions && extensions.length) {
      extensions.forEach((extension) => {
        cytoscape.use(extension);
      });
    }

    // convert custom stylesheets to style
    const style = stylesheets;

    // init cy instance's options
    const options = {
      container: this._cytoscapeRef.current,
      elements,
      style,
      layout,
      ...otherProps,
    };

    // init cy instance
    const cy = (this.cy = cytoscape(options));

    if (navigatorOptions) {
      this.initNavigator(navigatorOptions);
    }

    if (panzoomOptions) {
      this.initPanzoom(panzoomOptions);
    }

    if (global) {
      (window as any)[global] = cy;
    }

    // bind events
    bindEvents(this.cy, events, otherProps);

    // trigger onInit function
    onInit && onInit(this.cy, this._id);
  }

  componentWillUnmount() {
    const { onDestroy } = this.props;
    onDestroy && onDestroy(this.cy);
  }

  componentDidUpdate(prevProps: CytoscapeComponentProps) {
    patch(this.cy, prevProps, this.props);
  }

  initNavigator(navigatorOptions: Navigator) {
    if (typeof navigatorOptions === 'boolean') {
      if (navigatorOptions === false) return;

      const options = Object.assign(
        {},
        {
          container: `#navigator-${this._id}`,
        },
        defaultNavigatorOptions
      );

      this.cy.navigator(options);

      return;
    }

    const options = Object.assign(
      {},
      {
        container: `#navigator-${this._id}`,
      },
      defaultNavigatorOptions,
      navigatorOptions
    );

    (this.cy as any).navigator(options);
  }

  initPanzoom(panzoomOptions: Panzoom) {
    if (typeof panzoomOptions === 'boolean') {
      if (panzoomOptions === false) return;

      const options = Object.assign({}, defaultPanzoomOptions);

      (this.cy as any).panzoom(options);

      return;
    }

    const options = Object.assign({}, defaultPanzoomOptions, panzoomOptions);

    (this.cy as any).panzoom(options);
  }

  render(): JSX.Element | null {
    const { className, height, navigator: navigatorOptions } = this.props;

    const cytoscapeContainerStyle = {
      height,
    };

    return (
      <div
        className={classNames('cytoscape-container', className)}
        style={cytoscapeContainerStyle}
      >
        <div ref={this._cytoscapeRef} style={{ height: '100%' }}></div>
        {navigatorOptions && (
          <NavigatorComponent parentId={this._id} {...navigatorOptions} />
        )}
      </div>
    );
  }
}
