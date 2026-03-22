import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { 'aria-label': 'Enable notifications', checked: false, onChange: () => {} },
};

export const Checked: Story = {
  args: { 'aria-label': 'Enable notifications', checked: true, onChange: () => {} },
};

export const Error: Story = {
  args: { 'aria-label': 'Enable notifications', error: true, checked: false, onChange: () => {} },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'Enable notifications',
    disabled: true,
    checked: false,
    onChange: () => {},
  },
};
