import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xl', 'l', 'm', 's'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'secondary'],
    },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Heading>Default heading</Heading>,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Heading size="xl">Size xl — extra large</Heading>
      <Heading size="l">Size l — large (default)</Heading>
      <Heading size="m">Size m — medium</Heading>
      <Heading size="s">Size s — small</Heading>
    </div>
  ),
};

export const SemanticVsVisual: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Heading as="h1" size="s">
        h1 element, size s
      </Heading>
      <Heading as="h3" size="xl">
        h3 element, size xl
      </Heading>
      <Heading as="h6" size="l">
        h6 element, size l
      </Heading>
    </div>
  ),
};

export const WeightOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Heading weight="regular">Weight regular</Heading>
      <Heading weight="medium">Weight medium</Heading>
      <Heading weight="semibold">Weight semibold</Heading>
      <Heading weight="bold">Weight bold</Heading>
    </div>
  ),
};

export const ColorOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Heading color="default">Color default</Heading>
      <Heading color="muted">Color muted</Heading>
      <Heading color="secondary">Color secondary</Heading>
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Heading truncate>
        This heading is very long and will be truncated with an ellipsis at the end
      </Heading>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    as: 'h2',
    size: 'l',
    children: 'Playground heading',
  },
};
