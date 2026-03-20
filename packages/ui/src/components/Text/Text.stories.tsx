import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['heading-xl', 'heading-l', 'heading-m', 'heading-s', 'body-l', 'body', 'body-s'],
    },
    as: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'label',
        'legend',
        'caption',
        'figcaption',
        'time',
        'strong',
        'em',
      ],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'secondary'],
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
    },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text size="heading-xl">Heading XL — h1</Text>
      <Text size="heading-l">Heading L — h2</Text>
      <Text size="heading-m">Heading M — h3</Text>
      <Text size="heading-s">Heading S — h4</Text>
      <Text size="body-l">Body L — p</Text>
      <Text size="body">Body — p</Text>
      <Text size="body-s">Body S — p</Text>
    </div>
  ),
};

export const HeadingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text size="heading-xl">Heading XL</Text>
      <Text size="heading-l">Heading L</Text>
      <Text size="heading-m">Heading M</Text>
      <Text size="heading-s">Heading S</Text>
    </div>
  ),
};

export const BodyScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text size="body-l">Body L</Text>
      <Text size="body">Body</Text>
      <Text size="body-s">Body S</Text>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="body" color="default">
        Default color
      </Text>
      <Text size="body" color="muted">
        Muted color
      </Text>
      <Text size="body" color="secondary">
        Secondary color
      </Text>
    </div>
  ),
};

export const WeightOverride: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Text size="body" weight="regular">
        Regular weight
      </Text>
      <Text size="body" weight="medium">
        Medium weight
      </Text>
      <Text size="body" weight="semibold">
        Semibold weight
      </Text>
      <Text size="body" weight="bold">
        Bold weight
      </Text>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ width: '200px' }}>
      <Text size="body" truncate>
        This is a very long sentence that should be truncated with an ellipsis when it overflows the
        container
      </Text>
    </div>
  ),
};

export const DecoupledSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Text size="heading-l" as="h1">
        heading-l rendered as h1
      </Text>
      <Text size="heading-l" as="h2">
        heading-l rendered as h2
      </Text>
      <Text size="heading-l" as="h3">
        heading-l rendered as h3
      </Text>
    </div>
  ),
};
