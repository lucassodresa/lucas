import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('rendering', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Test">
        <button>OK</button>
      </Modal>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders dialog with correct role when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Confirm">
        <button>OK</button>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('sets aria-modal on the dialog', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Confirm">
        <button>OK</button>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('links dialog to its title via aria-labelledby', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Delete item">
        <button>OK</button>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)).toHaveTextContent('Delete item');
  });

  it('renders the title text visibly', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="My Modal">
        <button>OK</button>
      </Modal>,
    );
    expect(screen.getByText('My Modal')).toBeInTheDocument();
  });

  it('renders children inside the dialog', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        <button>Submit</button>
      </Modal>,
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});

describe('close behaviour', () => {
  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Modal>,
    );
    await user.click(screen.getByTestId('overlay-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the dialog content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Modal>,
    );
    await user.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('focus trap', () => {
  it('dialog has tabIndex=-1 for programmatic focus fallback', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test">
        <button>OK</button>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1');
  });
});

describe('accessibility', () => {
  it('passes axe when open', async () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()} title="Confirm delete">
        <p>Are you sure?</p>
        <button>Cancel</button>
        <button>Delete</button>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe when closed', async () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Confirm delete">
        <button>OK</button>
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
