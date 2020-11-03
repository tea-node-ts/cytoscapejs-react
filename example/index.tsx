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
  const [layout, setLayout] = React.useState(defaultLayout);

  const handleInit = (cy) => {
    console.log('inited');
  }

  const hanldeDblClick = (event, eventFrom) => {
    console.log('dblclick:', event, eventFrom);
  }

  const handleClick = (event, eventFrom) => {
    console.log('click:', event, eventFrom);
  };

  const handleCxtTap = (event, eventFrom) => {
    console.log('cxttap: ', event, eventFrom);
  };

  const handleLayoutStop = () => {
    console.log('layoutStop: ', layout);
  }

  const handleLayoutChange = layoutName => {
    const newLayout = {
      name: layoutName,
    };

    setLayout(newLayout);
  };
  const spanStyle ={display:'inline-block',paddingRight: '5px'};
  const ulStyle = {display:'inline-block', listStyle: 'none', margin: 0, padding: 0};
  const liStyle = {display:'inline-block',padding: '5px', border: '1px solid #efefef', cursor: 'pointer'};
  return (
    <div>
      <div>
        <span style={spanStyle}>Layout: </span>
        <ul style={ulStyle}>
          <li style={liStyle} onClick={() => handleLayoutChange('cola')}>cola</li>
          <li style={liStyle} onClick={() => handleLayoutChange('breadthfirst')}>breadthfirst</li>
          <li style={liStyle} onClick={() => handleLayoutChange('circle')}>circle</li>
          <li style={liStyle} onClick={() => handleLayoutChange('concentric')}>concentric</li>
          <li style={liStyle} onClick={() => handleLayoutChange('cose')}>cose</li>
          <li style={liStyle} onClick={() => handleLayoutChange('grid')}>grid</li>
        </ul>
      </div>
      <CytoscapeComponent
        global={"cy"}
        elements={defaultElements} 
        stylesheets={stylesheets}
        layout={layout}
        navigator={true}
        panzoom={panzoomOptions}
        extensions={[cola]}
        onInit={handleInit}
        onClick={handleClick}
        onDblClick={hanldeDblClick}
        onCxtTap={handleCxtTap}
        onLayoutStop={handleLayoutStop}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
