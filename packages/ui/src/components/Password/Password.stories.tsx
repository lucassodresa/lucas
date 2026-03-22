import type { Meta, StoryObj } from '@storybook/react';
import { Password } from './Password';

const meta = {
  title: 'Components/Password',
  component: Password,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '0 16px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Password',
    showLabel: 'Show password',
    hideLabel: 'Hide password',
    placeholder: 'Enter password',
  },
};

export const Error: Story = {
  args: {
    'aria-label': 'Password',
    showLabel: 'Show password',
    hideLabel: 'Hide password',
    error: true,
    placeholder: 'Enter password',
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Password',
    showLabel: 'Show password',
    hideLabel: 'Hide password',
    disabled: true,
    placeholder: 'Enter password',
  },
};
