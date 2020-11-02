import React, { FC, useRef, useEffect } from 'react';
import classnames from 'classnames';
import NavigatorProps from '../types/NavigatorProps.types';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import '../scss/navigator.scss';

const NavigatorComponent: FC<NavigatorProps> = (props) => {
  const {
    className = '',
    headerClassName = '',
    parentId,
    afterDragging = null,
  } = props;

  const containerRef: React.RefObject<HTMLDivElement> = useRef(null);
  const headerRef: React.RefObject<HTMLDivElement> = useRef(null);

  let dragging = false;
  let mouseDownX: number;
  let mouseDownY: number;
  let initialLeft: number;
  let initialTop: number;

  const handleMouseMove = (e: any) => {
    if (!dragging) {
      return;
    }

    if (!containerRef.current || !containerRef.current.offsetParent) return;

    const deltaX = e.pageX - mouseDownX;
    const deltaY = e.pageY - mouseDownY;

    let left = initialLeft + deltaX;
    let top = initialTop + deltaY;

    const parentWidth = containerRef.current.offsetParent.clientWidth;
    const parentHeight = containerRef.current.offsetParent.clientHeight;
    const { offsetWidth, offsetHeight } = containerRef.current;

    if (left + offsetWidth > parentWidth) {
      left = parentWidth - offsetWidth;
    }

    const modalBodyPadding =
      getComputedStyle(containerRef.current).padding || '';
    const [paddingTop, , paddingBottom] = modalBodyPadding.split(' ');
    let actualPaddingBottom = paddingBottom;
    if (!actualPaddingBottom) {
      actualPaddingBottom = paddingTop || '0px';
    }

    const height = offsetHeight - parseFloat(actualPaddingBottom);

    if (top + height > parentHeight) {
      top = parentHeight - height;
    }

    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }

    containerRef.current.style.left = `${left}px`;
    containerRef.current.style.top = `${top}px`;
  };

  const handleMouseUp = () => {
    const currentDragging = dragging;
    dragging = false;
    window.removeEventListener('mouseup', handleMouseUp, false);
    window.removeEventListener('mousemove', handleMouseMove, false);
    if (currentDragging && afterDragging) {
      afterDragging();
    }
  };

  const handleMouseDown = (e: any) => {
    if (!containerRef.current) return;

    dragging = true;
    mouseDownX = e.pageX;
    mouseDownY = e.pageY;
    initialLeft = containerRef.current.offsetLeft;
    initialTop = containerRef.current.offsetTop;

    window.addEventListener('mouseup', handleMouseUp, false);
    window.addEventListener('mousemove', handleMouseMove, false);
  };

  useEffect(() => {
    headerRef?.current?.addEventListener('mousedown', handleMouseDown);
    return () => {
      headerRef?.current?.removeEventListener('mousedown', handleMouseDown);
    };
  });

  const handleDoubleClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className={classnames('cytoscape-navigator-container', className)}
      onDoubleClick={handleDoubleClick}
    >
      <div
        ref={headerRef}
        className={classnames('cytoscape-navigator-header', headerClassName)}
      >
        导航器
      </div>
      <div
        id={`navigator-${parentId}`}
        className="cytoscape-navigator-body"
        role="presentation"
      />
    </div>
  );
};

export default NavigatorComponent;
