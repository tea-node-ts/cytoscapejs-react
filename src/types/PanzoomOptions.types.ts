export default interface PanzoomOptions {
  zoomFactor?: number;
  zoomDelay?: number;
  minZoom?: number;
  maxZoom?: number;
  fitPadding?: number;
  panSpeed?: number;
  panDistance?: number;
  panDragAreaSize?: number;
  panMinPercentSpeed?: number;
  panInactiveArea?: number;
  panIndicatorMinOpacity?: number;
  zoomOnly?: boolean;
  fitSelector?: any;
  animateOnFit?: () => boolean;
  fitAnimationDuration?: number;
  sliderHandleIcon?: string;
  zoomInIcon?: string;
  zoomOutIcon?: string;
  resetIcon?: string;
}
