import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Overlay } from './Overlay';

vi.mock('focus-trap-react', () => ({
  default: ({
    children,
    focusTrapOptions,
  }: {
    children: React.ReactNode;
    focusTrapOptions?: { returnFocusOnDeactivate?: boolean; allowOutsideClick?: boolean };
  }) => (
    <div
      data-testid="focus-trap"
      data-return-focus={String(focusTrapOptions?.returnFocusOnDeactivate)}
      data-allow-outside-click={String(focusTrapOptions?.allowOutsideClick)}
    >
      {children}
    </div>
  ),
}));

describe('rendering', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <Overlay isOpen={false} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders children when isOpen is true', () => {
    render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(screen.getByRole('button', { name: 'Content' })).toBeInTheDocument();
  });
});

describe('backdrop click', () => {
  it('calls onClose when the backdrop is clicked directly', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <button>Content</button>
        </div>
      </Overlay>,
    );
    await user.click(screen.getByTestId('overlay-backdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when children stop propagation', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <button>Content</button>
        </div>
      </Overlay>,
    );
    await user.click(screen.getByRole('button', { name: 'Content' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('keyboard', () => {
  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={onClose}>
        <button>Content</button>
      </Overlay>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when other keys are pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Overlay isOpen={true} onClose={onClose}>
        <button>Content</button>
      </Overlay>,
    );
    await user.keyboard('{Enter}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not register Escape listener when isOpen is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Overlay isOpen={false} onClose={onClose}>
        <button>Content</button>
      </Overlay>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('scroll lock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('sets body overflow to hidden when open', () => {
    render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when isOpen changes to false', () => {
    const { rerender } = render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    rerender(
      <Overlay isOpen={false} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe('');
  });

  it('restores a previously set body overflow value on close', () => {
    document.body.style.overflow = 'auto';
    const { rerender } = render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    rerender(
      <Overlay isOpen={false} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe('auto');
  });

  it('does not set body overflow when isOpen is false', () => {
    render(
      <Overlay isOpen={false} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(document.body.style.overflow).toBe('');
  });
});

describe('focus trap', () => {
  it('renders FocusTrap with returnFocusOnDeactivate: true', () => {
    render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(screen.getByTestId('focus-trap')).toHaveAttribute('data-return-focus', 'true');
  });

  it('renders FocusTrap with allowOutsideClick: true so backdrop clicks reach onClose', () => {
    render(
      <Overlay isOpen={true} onClose={vi.fn()}>
        <button>Content</button>
      </Overlay>,
    );
    expect(screen.getByTestId('focus-trap')).toHaveAttribute('data-allow-outside-click', 'true');
  });
});
