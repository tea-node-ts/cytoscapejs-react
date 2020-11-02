export interface CytoscapeOptions {
  zoom?: number;
  pan?: cytoscape.Position;
  minZoom?: number;
  maxZoom?: number;
  zoomingEnabled?: boolean;
  userZoomingEnabled?: boolean;
  panningEnabled?: boolean;
  userPanningEnabled?: boolean;
  boxSelectionEnabled?: boolean;
  selectionType?: cytoscape.SelectionType;
  touchTapThreshold?: number;
  desktopTapThreshold?: number;
  autolock?: boolean;
  autoungrabify?: boolean;
  autounselectify?: boolean;
  headless?: boolean;
  styleEnabled?: boolean;
  hideEdgesOnViewport?: boolean;
  hideLabelsOnViewport?: boolean;
  textureOnViewport?: boolean;
  motionBlur?: boolean;
  motionBlurOpacity?: number;
  wheelSensitivity?: number;
  pixelRatio?: number | 'auto';
}
