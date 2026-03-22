import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { 'aria-label': 'Email', placeholder: 'Enter your email' },
};

export const WithValue: Story = {
  args: { 'aria-label': 'Email', value: 'user@example.com', onChange: () => {} },
};

export const Error: Story = {
  args: { 'aria-label': 'Email', error: true, value: 'bad-input', onChange: () => {} },
};

export const Disabled: Story = {
  args: { 'aria-label': 'Email', placeholder: 'Enter your email', disabled: true },
};
