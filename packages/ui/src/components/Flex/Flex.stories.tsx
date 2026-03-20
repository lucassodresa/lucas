import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'Primitives/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24],
    },
    inline: { control: 'boolean' },
    grow: { control: 'boolean' },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorBox = ({ label }: { label: string }) => (
  <div
    style={{
      background: 'var(--color-primary-muted)',
      border: '1px solid var(--color-primary-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--spacing-3) var(--spacing-4)',
      fontSize: 'var(--font-size-sm)',
    }}
  >
    {label}
  </div>
);

export const Overview: Story = {
  render: () => (
    <Flex
      gap={4}
      padding={4}
      style={{ background: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)' }}
    >
      <ColorBox label="One" />
      <ColorBox label="Two" />
      <ColorBox label="Three" />
    </Flex>
  ),
};

export const Directions: Story = {
  render: () => (
    <Flex direction="column" gap={6}>
      {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((dir) => (
        <Flex key={dir} direction="column" gap={2}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            direction=&quot;{dir}&quot;
          </span>
          <Flex
            direction={dir}
            gap={2}
            padding={3}
            style={{ background: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)' }}
          >
            <ColorBox label="A" />
            <ColorBox label="B" />
            <ColorBox label="C" />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Flex direction="column" gap={6}>
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <Flex key={align} direction="column" gap={2}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            align=&quot;{align}&quot; justify=&quot;between&quot;
          </span>
          <Flex
            align={align}
            justify="between"
            padding={3}
            style={{
              background: 'var(--color-bg-muted)',
              borderRadius: 'var(--radius-md)',
              minHeight: 'var(--spacing-20)',
            }}
          >
            <ColorBox label="First" />
            <ColorBox label="Second" />
            <ColorBox label="Third" />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const GapScale: Story = {
  render: () => (
    <Flex direction="column" gap={6}>
      {([2, 4, 6, 8] as const).map((gapValue) => (
        <Flex key={gapValue} direction="column" gap={2}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            gap={gapValue}
          </span>
          <Flex
            gap={gapValue}
            padding={3}
            style={{ background: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)' }}
          >
            <ColorBox label="Alpha" />
            <ColorBox label="Beta" />
            <ColorBox label="Gamma" />
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const AsNav: Story = {
  render: () => (
    <Flex
      as="nav"
      aria-label="Site navigation"
      gap={4}
      padding={4}
      align="center"
      style={{ background: 'var(--color-bg-muted)', borderRadius: 'var(--radius-md)' }}
    >
      <a href="#home" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
        Home
      </a>
      <a href="#about" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
        About
      </a>
      <a href="#contact" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>
        Contact
      </a>
    </Flex>
  ),
};

export const WrappingItems: Story = {
  render: () => (
    <Flex
      wrap="wrap"
      gap={3}
      padding={4}
      style={{
        background: 'var(--color-bg-muted)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '400px',
      }}
    >
      {(
        [
          'Alpha',
          'Beta',
          'Gamma',
          'Delta',
          'Epsilon',
          'Zeta',
          'Eta',
          'Theta',
          'Iota',
          'Kappa',
        ] as const
      ).map((label) => (
        <ColorBox key={label} label={label} />
      ))}
    </Flex>
  ),
};
