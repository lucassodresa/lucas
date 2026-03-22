import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: { 'aria-label': 'Accept terms', checked: false, onChange: () => {} },
};

export const Checked: Story = {
  args: { 'aria-label': 'Accept terms', checked: true, onChange: () => {} },
};

export const Indeterminate: Story = {
  args: { 'aria-label': 'Select all', indeterminate: true, checked: false, onChange: () => {} },
};

export const Error: Story = {
  args: { 'aria-label': 'Accept terms', error: true, checked: false, onChange: () => {} },
};

export const Disabled: Story = {
  args: { 'aria-label': 'Accept terms', disabled: true, checked: false, onChange: () => {} },
};
