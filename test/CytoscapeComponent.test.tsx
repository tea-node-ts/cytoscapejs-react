import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as CytoscapeComponent } from '../stories/CytoscapeComponent.stories';

describe('CytoscapeComponent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CytoscapeComponent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
