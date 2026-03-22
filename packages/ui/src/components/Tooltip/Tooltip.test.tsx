import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Tooltip } from './Tooltip';

vi.mock('@floating-ui/react', () => ({
  useFloating: () => ({
    refs: { setReference: () => {}, setFloating: () => {} },
    floatingStyles: { position: 'fixed' as const, top: 0, left: 0 },
    context: {},
  }),
  flip: () => ({}),
  shift: () => ({}),
  offset: () => ({}),
  arrow: () => ({}),
  FloatingArrow: React.forwardRef(() => null),
}));

describe('rendering', () => {
  it('renders the trigger child', () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not render tooltip content initially', () => {
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('show on hover', () => {
  afterEach(() => vi.useRealTimers());

  it('shows tooltip after 150ms on mouseenter', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
  });

  it('hides tooltip after 100ms on mouseleave', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Help text"><button>Hover me</button></Tooltip>);
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.unhover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('show on focus', () => {
  afterEach(() => vi.useRealTimers());

  it('shows tooltip after 150ms on focus', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Focus tip"><button>Focus me</button></Tooltip>);
    await user.tab();
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip after 100ms on blur', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Focus tip"><button>Focus me</button></Tooltip>);
    await user.tab();
    act(() => vi.advanceTimersByTime(150));
    await user.tab();
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('disabled trigger', () => {
  afterEach(() => vi.useRealTimers());

  it('wraps disabled child in a span', () => {
    const { container } = render(
      <Tooltip content="Disabled reason">
        <button disabled>Submit</button>
      </Tooltip>,
    );
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span?.querySelector('button[disabled]')).toBeInTheDocument();
  });

  it('shows tooltip on hover of the wrapper span for a disabled trigger', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = render(
      <Tooltip content="Disabled reason">
        <button disabled>Submit</button>
      </Tooltip>,
    );
    const wrapper = container.querySelector('span')!;
    await user.hover(wrapper);
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Disabled reason');
  });

  it('preserves disabled state on the button', () => {
    render(
      <Tooltip content="Disabled reason">
        <button disabled>Submit</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});

describe('ARIA', () => {
  afterEach(() => vi.useRealTimers());

  it('tooltip element has role="tooltip"', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Aria tip"><button>Button</button></Tooltip>);
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('trigger has aria-describedby pointing to the tooltip when visible', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Tooltip content="Aria tip"><button>Button</button></Tooltip>);
    await user.hover(screen.getByRole('button'));
    act(() => vi.advanceTimersByTime(150));
    const tooltip = screen.getByRole('tooltip');
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('trigger does not have aria-describedby when tooltip is hidden', () => {
    render(<Tooltip content="Aria tip"><button>Button</button></Tooltip>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
  });
});

describe('multiple instances', () => {
  afterEach(() => vi.useRealTimers());

  it('two Tooltip triggers manage state independently', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <>
        <Tooltip content="First tip"><button>First</button></Tooltip>
        <Tooltip content="Second tip"><button>Second</button></Tooltip>
      </>,
    );
    await user.hover(screen.getByRole('button', { name: 'First' }));
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toHaveTextContent('First tip');
    await user.unhover(screen.getByRole('button', { name: 'First' }));
    act(() => vi.advanceTimersByTime(100));
    await user.hover(screen.getByRole('button', { name: 'Second' }));
    act(() => vi.advanceTimersByTime(150));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Second tip');
  });
});

describe('accessibility', () => {
  it('passes axe with tooltip hidden', async () => {
    const { container } = render(
      <Tooltip content="Help text"><button>Hover me</button></Tooltip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
