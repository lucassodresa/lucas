import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    preventDoubleClick: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['primary', 'secondary', 'ghost', 'danger', 'link'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Primary: Story = {
  args: { children: 'Click me' },
};

export const Secondary: Story = {
  args: { children: 'Click me', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { children: 'Click me', variant: 'ghost' },
};

export const Danger: Story = {
  args: { children: 'Delete account', variant: 'danger' },
};

export const Link: Story = {
  args: { children: 'Learn more', variant: 'link' },
};

export const Disabled: Story = {
  args: { children: 'Click me', disabled: true },
};

export const Loading: Story = {
  args: { children: 'Save', isLoading: true },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Search',
    leftIcon: <span style={{ fontSize: '1em' }}>🔍</span>,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    rightIcon: <span style={{ fontSize: '1em' }}>→</span>,
  },
};

export const IconOnly: Story = {
  args: {
    leftIcon: <span style={{ fontSize: '1em' }}>✕</span>,
    'aria-label': 'Close',
  },
};

export const AsLink: Story = {
  args: {
    children: 'Continue',
    href: '/next-step',
  },
};
