import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CytoscapeComponent } from '../src';
import { CytoscapeComponentProps } from '../src/types/CytoscapeComponentProps.types';

const meta: Meta = {
  title: 'CytoscapeComponent',
  component: CytoscapeComponent,
};

export default meta;

const Template: Story<CytoscapeComponentProps> = (args) => (
  <CytoscapeComponent navigator={false} panzoom={false} {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
