import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { SearchIcon, CheckIcon, WarningIcon, AlertIcon, InfoIcon } from './icons';
import * as icons from './icons';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'muted', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <SearchIcon /> },
};

export const Sizes: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.375rem',
          }}
        >
          <Icon size={size}>
            <SearchIcon />
          </Icon>
          <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="inherit">
          <SearchIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>inherit</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="primary">
          <InfoIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>primary</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="muted">
          <SearchIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>muted</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="success">
          <CheckIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>success</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="warning">
          <WarningIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>warning</span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}
      >
        <Icon size="lg" color="danger">
          <AlertIcon />
        </Icon>
        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>danger</span>
      </div>
    </div>
  ),
};

export const IconGallery: Story = {
  args: { children: '' },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      {Object.entries(icons).map(([name, IconComponent]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.375rem',
            width: '5rem',
          }}
        >
          <Icon size="md">
            <IconComponent />
          </Icon>
          <span
            style={{
              fontSize: '0.6875rem',
              fontFamily: 'monospace',
              textAlign: 'center',
              wordBreak: 'break-all',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};
