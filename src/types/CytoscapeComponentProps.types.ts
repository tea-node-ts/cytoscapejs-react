import { Callbacks } from './Callbacks.types';
import { CytoscapeOptions } from './CytoscapeOptions.types';
import NavigatorOptions from './NavigatorOptions.types';
import PanzoomOptions from './PanzoomOptions.types';

export interface EventMap {
  [key: string]: (event: any) => void;
}

export interface Events {
  events?: EventMap;
}

export type Height = number | string;

export type ClassName = string;

export type Element = cytoscape.NodeDefinition | cytoscape.EdgeDefinition;

export interface Elements {
  nodes: cytoscape.NodeDefinition[];
  edges: cytoscape.EdgeDefinition[];
}

export type StyleSheets = cytoscape.Stylesheet[];

export type Navigator = boolean | NavigatorOptions;

export type Panzoom = boolean | PanzoomOptions;

export interface CytoscapeComponentProps
  extends Callbacks,
    Events,
    CytoscapeOptions {
  global?: string;
  height?: Height;
  className?: ClassName;
  elements?: Elements;
  stylesheets?: StyleSheets;
  layout?: cytoscape.LayoutOptions;
  extensions?: Array<any>;
  navigator?: Navigator;
  panzoom?: Panzoom;
}
