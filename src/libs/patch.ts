import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import get from 'lodash/get';
import differenceBy from 'lodash/differenceBy';
import fromPairs from 'lodash/fromPairs';
import { CytoscapeComponentProps } from '../types/CytoscapeComponentProps.types';

let runningLayout: any;

// patch
export const patch = (
  cy: any,
  prevProps: CytoscapeComponentProps,
  props: CytoscapeComponentProps
) => {
  let runLayout = false;

  cy.batch(() => {
    const { elements: prevElements } = prevProps;
    const { elements } = props;

    const prevNodes = prevElements?.nodes;
    const nodes = elements?.nodes;

    if (!isEqual(nodes, prevNodes)) {
      runLayout = patchElements(cy, prevNodes, nodes);
    }

    const prevEdges = prevElements?.edges;
    const edges = elements?.edges;

    if (!isEqual(edges, prevEdges)) {
      patchElements(cy, prevEdges, edges);
    }

    const { stylesheets: prevStylesheets } = prevProps;
    const { stylesheets } = props;

    if (!isEqual(prevStylesheets, stylesheets)) {
      patchStylesheets(cy, stylesheets);
    }

    [
      // simple keys that can be patched directly (key same as fn name)
      'zoom',
      'minZoom',
      'maxZoom',
      'zoomingEnabled',
      'userZoomingEnabled',
      'pan',
      'panningEnabled',
      'autoungrabify',
      'autolock',
      'autounselectify',
    ].forEach((key) => {
      const oldValue = (prevProps as any)[key];
      const newValue = (props as any)[key];
      if (newValue !== undefined && isEqual(oldValue, newValue)) {
        patchJson(cy, key, newValue);
      }
    });

    const { layout: prevLayout } = prevProps;
    const { layout } = props;

    if (runLayout || JSON.stringify(prevLayout) !== JSON.stringify(layout)) {
      patchLayout(cy, layout);
    }
  });
};

const patchElements = (cy: any, eles1: any[] = [], eles2: any[] = []) => {
  const toAdd: any[] = [];
  const toPatch: any[] = [];
  const toRm = cy.collection();

  const eles1Map = fromPairs(eles1.map((item) => [item.data.id, item]));

  eles2.forEach((ele2) => {
    const id = get(ele2, 'data.id', null);

    const ele1 = eles1Map[id];

    if (ele1) {
      toPatch.push({ ele1, ele2 });
    } else {
      toAdd.push(ele2);
    }
  });

  differenceBy(eles1, eles2, 'data.id').forEach((item) => {
    toRm.merge(cy.getElementById(item.data.id));
  });

  if (toRm.length > 0) {
    cy.remove(toRm);
  }

  if (toAdd.length > 0) {
    cy.add(toAdd);
  }

  toPatch.forEach(({ ele1, ele2 }) => patchElement(cy, ele1, ele2));

  return toAdd.length > 0;
};

const patchElement = (cy: any, ele1: any, ele2: any) => {
  const { id } = ele2.data;

  if (!id) return;

  const cyEle = cy.getElementById(id);

  const json: any = {};
  const jsonKeys = [
    'data',
    'position',
    'selected',
    'selectable',
    'locked',
    'grabbable',
    'classes',
  ];

  jsonKeys.forEach((key) => {
    const oldValue = (ele1 as any)[key];
    const newValue = (ele2 as any)[key];

    if (!isEqual(newValue, oldValue)) {
      json[key] = newValue;
    }
  });

  if (size(json) > 0) {
    cyEle.json(json);
  }
};

const patchStylesheets = (cy: any, stylesheets: any) => {
  const prevStylesheets = cy.style();

  if (!prevStylesheets) return;

  prevStylesheets.fromJson(stylesheets).update();
};

const patchJson = (cy: any, key: any, newValue: any) => {
  cy[key](newValue);
};

export const patchLayout = (cy: any, layout: any) => {
  if (layout !== null) {
    if (runningLayout) {
      runningLayout?.stop();
    }

    cy.layout(layout).run();
  }
};
