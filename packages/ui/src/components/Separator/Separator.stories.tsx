import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 'var(--spacing-4)' }}>
      <p style={{ margin: '0 0 var(--spacing-4)' }}>Content above</p>
      <Separator />
      <p style={{ margin: 'var(--spacing-4) 0 0' }}>Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-4)',
        height: 'var(--spacing-10)',
      }}
    >
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const Decorative: Story = {
  render: () => (
    <div style={{ padding: 'var(--spacing-4)' }}>
      <p
        style={{
          margin: '0 0 var(--spacing-4)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        decorative=true (default) — hidden from screen readers
      </p>
      <Separator decorative={true} />
      <p
        style={{
          margin: 'var(--spacing-6) 0 var(--spacing-4)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        decorative=false — visible to screen readers as a separator landmark
      </p>
      <Separator decorative={false} />
    </div>
  ),
};

export const AsDiv: Story = {
  render: () => (
    <div style={{ padding: 'var(--spacing-4)' }}>
      <p style={{ margin: '0 0 var(--spacing-4)' }}>Rendered as a div element</p>
      <Separator as="div" />
      <p style={{ margin: 'var(--spacing-4) 0 0' }}>Still a visual divider</p>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => (
    <div
      style={{
        display: args.orientation === 'vertical' ? 'flex' : 'block',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-4)',
        height: args.orientation === 'vertical' ? 'var(--spacing-10)' : undefined,
      }}
    >
      <span>Before</span>
      <Separator {...args} />
      <span>After</span>
    </div>
  ),
};
