import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isOpen: true, title: 'Confirm action', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>
            Are you sure you want to continue? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  args: { isOpen: true, title: 'Sign in', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            onSubmit={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Email
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-default)',
                  fontSize: 'var(--font-size-md)',
                }}
              />
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" type="button" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const KeyboardNavigation: Story = {
  args: { isOpen: true, title: 'Keyboard demo', onClose: () => {}, children: null },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open (then press Tab / Escape)</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>
            Tab cycles through the buttons below. Escape closes the modal.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              First
            </Button>
            <Button onClick={() => setIsOpen(false)}>Second</Button>
          </div>
        </Modal>
      </>
    );
  },
};
