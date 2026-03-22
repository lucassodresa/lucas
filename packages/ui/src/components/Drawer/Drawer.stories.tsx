import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RightDrawer: Story = {
  args: { isOpen: true, title: 'Navigation', side: 'right', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ padding: '0.5rem 0', color: 'var(--color-text-primary)', textDecoration: 'none' }}
              >
                {item}
              </a>
            ))}
          </nav>
        </Drawer>
      </>
    );
  },
};

export const LeftDrawer: Story = {
  args: { isOpen: true, title: 'Filters', side: 'left', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input type="checkbox" />
              <span>In stock</span>
            </label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input type="checkbox" />
              <span>On sale</span>
            </label>
            <Button onClick={() => setIsOpen(false)}>Apply filters</Button>
          </div>
        </Drawer>
      </>
    );
  },
};

export const KeyboardNavigation: Story = {
  args: { isOpen: true, title: 'Keyboard demo', side: 'right', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open (Tab / Escape)</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>
            Tab cycles through the buttons. Escape closes the drawer.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Action one
            </Button>
            <Button onClick={() => setIsOpen(false)}>Action two</Button>
          </div>
        </Drawer>
      </>
    );
  },
};
