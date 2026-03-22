import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Drawer } from './Drawer';

vi.mock('focus-trap-react', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('rendering', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Settings">
        <button>OK</button>
      </Drawer>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders dialog with correct role when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Settings">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('sets aria-modal on the dialog', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Settings">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('links dialog to its title via aria-labelledby', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Filters">
        <button>OK</button>
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(document.getElementById(labelId!)).toHaveTextContent('Filters');
  });

  it('renders the title text visibly', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Navigation">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('defaults to right side', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByRole('dialog').className).toMatch(/drawer--right/);
  });

  it('applies left side class when side is left', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test" side="left">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByRole('dialog').className).toMatch(/drawer--left/);
  });
});

describe('close behaviour', () => {
  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Drawer>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Drawer>,
    );
    await user.click(screen.getByTestId('overlay-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the dialog content is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={onClose} title="Test">
        <button>OK</button>
      </Drawer>,
    );
    await user.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('focus trap', () => {
  it('dialog has tabIndex=-1 for programmatic focus fallback', () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test">
        <button>OK</button>
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('tabindex', '-1');
  });
});

describe('accessibility', () => {
  it('passes axe for right drawer', async () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Navigation" side="right">
        <nav>
          <a href="/home">Home</a>
        </nav>
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for left drawer', async () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={vi.fn()} title="Filters" side="left">
        <button>Apply</button>
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe when closed', async () => {
    const { container } = render(
      <Drawer isOpen={false} onClose={vi.fn()} title="Navigation">
        <button>OK</button>
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
