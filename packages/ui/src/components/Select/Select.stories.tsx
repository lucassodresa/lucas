import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { 'aria-label': 'Colour' },
  render: (args) => (
    <Select {...args}>
      <option value="">Select a colour</option>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Select>
  ),
};

export const WithValue: Story = {
  args: { 'aria-label': 'Colour', value: 'green', onChange: () => {} },
  render: (args) => (
    <Select {...args}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Select>
  ),
};

export const Error: Story = {
  args: { 'aria-label': 'Colour', error: true },
  render: (args) => (
    <Select {...args}>
      <option value="">Select a colour</option>
      <option value="red">Red</option>
    </Select>
  ),
};

export const Disabled: Story = {
  args: { 'aria-label': 'Colour', disabled: true },
  render: (args) => (
    <Select {...args}>
      <option value="">Select a colour</option>
      <option value="red">Red</option>
    </Select>
  ),
};
