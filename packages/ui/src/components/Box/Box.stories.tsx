import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'nav', 'main', 'aside', 'ul', 'li'],
    },
    padding: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingX: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingY: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingTop: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingRight: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingBottom: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    paddingLeft: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    margin: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginX: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginY: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginTop: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginRight: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginBottom: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
    marginLeft: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

const spacingScale = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const;

export const Overview: Story = {
  args: { children: 'Box' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {spacingScale.map((value) => (
        <Box
          key={value}
          padding={value}
          style={{ background: 'var(--color-bg-muted)', display: 'inline-block' }}
        >
          padding={value}
        </Box>
      ))}
    </div>
  ),
};

export const SpacingScale: Story = {
  args: { children: 'Box' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {spacingScale.map((value) => (
        <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ width: '3rem', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
            {value}
          </span>
          <Box
            padding={value}
            style={{
              background: 'var(--color-primary-muted)',
              outline: '1px solid var(--color-primary-border)',
            }}
          >
            content
          </Box>
        </div>
      ))}
    </div>
  ),
};

export const AsSemantic: Story = {
  args: { children: 'Box' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {(['section', 'article', 'nav', 'main', 'aside'] as const).map((tag) => (
        <Box
          key={tag}
          as={tag}
          padding={4}
          aria-label={tag}
          style={{ background: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)' }}
        >
          as=&quot;{tag}&quot;
        </Box>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  args: {
    padding: 4,
    children: 'Adjust spacing props in the controls panel',
    style: { background: 'var(--color-bg-muted)', display: 'inline-block' },
  },
};
