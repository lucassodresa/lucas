import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('rendering', () => {
  it('renders as a button with accessible name', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders as an anchor with role=button when href is provided', () => {
    render(<Button href="/next">Continue</Button>);
    const el = screen.getByRole('button', { name: 'Continue' });
    expect(el.tagName).toBe('A');
  });

  it('sets draggable=false on the anchor', () => {
    render(<Button href="/next">Continue</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('draggable', 'false');
  });

  it('renders an icon-only button when aria-label is provided', () => {
    render(<Button leftIcon={<span>★</span>} aria-label="Favourite" />);
    expect(screen.getByRole('button', { name: 'Favourite' })).toBeInTheDocument();
  });
});

describe('anchor-button keyboard activation', () => {
  it('Space key activates onClick on an href button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button href="/next" onClick={onClick}>
        Continue
      </Button>,
    );
    await user.tab();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Enter key activates onClick on an href button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button href="/next" onClick={onClick}>
        Continue
      </Button>,
    );
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('click behaviour', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button isLoading onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('disabled state', () => {
  it('sets the native disabled attribute on a button', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-disabled on a button', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets aria-disabled on a disabled anchor', () => {
    render(
      <Button href="/next" disabled>
        Continue
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('removes href from a disabled anchor so navigation cannot occur', () => {
    render(
      <Button href="/next" disabled>
        Continue
      </Button>,
    );
    expect(screen.getByRole('button')).not.toHaveAttribute('href');
  });
});

describe('loading state', () => {
  it('sets aria-busy when loading', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('disables the button when loading', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('uses the children string as aria-label when loading (label disappears visually)', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('prefers an explicit aria-label over children when loading', () => {
    render(
      <Button isLoading aria-label="Saving changes">
        Save
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Saving changes' })).toBeInTheDocument();
  });
});

describe('preventDoubleClick', () => {
  it('calls onClick once when two clicks arrive rapidly on a submit button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="submit" preventDoubleClick onClick={onClick}>
        Submit
      </Button>,
    );
    const btn = screen.getByRole('button');
    await user.click(btn);
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('re-enables after the cooldown expires', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClick = vi.fn();
    render(
      <Button type="submit" preventDoubleClick onClick={onClick}>
        Submit
      </Button>,
    );
    const btn = screen.getByRole('button');
    await user.click(btn);
    act(() => vi.advanceTimersByTime(1000));
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('does not block rapid clicks on a type=button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button type="button" preventDoubleClick onClick={onClick}>
        Click
      </Button>,
    );
    const btn = screen.getByRole('button');
    await user.click(btn);
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

describe('icons', () => {
  it('renders leftIcon', () => {
    render(<Button leftIcon={<span data-testid="left-icon" />}>Search</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders rightIcon', () => {
    render(<Button rightIcon={<span data-testid="right-icon" />}>Next</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('hides icons when loading (spinner is shown instead)', () => {
    render(
      <Button isLoading leftIcon={<span data-testid="left-icon" />}>
        Save
      </Button>,
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it.each(['primary', 'secondary', 'ghost', 'danger', 'link'] as const)(
    'passes axe for variant=%s',
    async (variant) => {
      const { container } = render(<Button variant={variant}>Click me</Button>);
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it('passes axe when disabled', async () => {
    const { container } = render(<Button disabled>Click me</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe when loading', async () => {
    const { container } = render(<Button isLoading>Save</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for an anchor button', async () => {
    const { container } = render(<Button href="/next">Continue</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for a disabled anchor button', async () => {
    const { container } = render(
      <Button href="/next" disabled>
        Continue
      </Button>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for an icon-only button with aria-label', async () => {
    const { container } = render(<Button leftIcon={<span>★</span>} aria-label="Favourite" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
