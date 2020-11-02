import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cola from 'cytoscape-cola';
import { CytoscapeComponent } from '../.';


const getNodes = (max = 100) => {
  const nodes: any[] = [];

  const centerId = Math.floor(max / 2);

  for (let i = 0; i < max; i++) {
    const node: any = { data: { id: `n${i}`, name: `n${i}` } };

    if (centerId === i) {
      node.data.center = true;
    }

    nodes.push(node);
  }

  return nodes;
};

const getEdges = (max = 99, maxNodes = 100) => {
  const edges = [];

  const set = new Set();

  const centerId = Math.floor(maxNodes / 2);

  while (true) {
    if (set.size >= max) break;

    const n2 = Math.floor(Math.random() * maxNodes);

    const uniqKey = `n${centerId}n${n2}`;

    edges.push({
      data: {
        id: uniqKey,
        source: `n${centerId}`,
        target: `n${n2}`,
        label: `n${centerId}n${n2}`,
        classes: 'relationship',
      },
    });

    set.add(uniqKey);
  }

  return edges;
};


const defaultElements = {
  nodes: getNodes(),
  edges: getEdges(),
};

const stylesheets = [ // the stylesheet for the graph
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(id)'
    }
  },

  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
];

const defaultLayout = {
  name: 'cola'
};


const defaultNavigatorOptions = {
  container: false // html dom element
  , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
  , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
  , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
  , dblClickDelay: 200 // milliseconds
  , removeCustomContainer: true // destroy the container specified by user on plugin destroy
  , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
};

const panzoomOptions = {
  minZoom: 1,
  maxZoom: 3,
};

const App = () => {
  const handleInit = (cy) => {
    console.log('inited');
  }

  return (
    <div>
      <CytoscapeComponent
        global={"cy"}
        elements={defaultElements} 
        stylesheets={stylesheets}
        layout={defaultLayout}
        navigator={true}
        panzoom={panzoomOptions}
        extensions={[cola]}
        onInit={handleInit}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
