import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: 'This is a tooltip', children: <button>Hover me</button> },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover or focus me</Button>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  args: { content: 'Delete this item', children: <button>×</button> },
  render: (args) => (
    <Tooltip {...args}>
      <Button aria-label="Delete">×</Button>
    </Tooltip>
  ),
};

export const OnDisabledButton: Story = {
  args: { content: 'Complete the form before submitting', children: <button>Submit</button> },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <Tooltip {...args}>
        <Button disabled>Submit</Button>
      </Tooltip>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', margin: 0 }}>
        Hover over the disabled button to see the tooltip.
      </p>
    </div>
  ),
};

export const NearViewportEdge: Story = {
  args: { content: 'Floating UI repositions me automatically', children: <button>Near edge</button> },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
      <Tooltip {...args}>
        <Button variant="secondary">Hover near right edge</Button>
      </Tooltip>
    </div>
  ),
};
