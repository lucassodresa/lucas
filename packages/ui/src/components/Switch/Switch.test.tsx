import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('rendering', () => {
  it('renders a checkbox', () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('forwards ref to the hidden input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} aria-label="Enable notifications" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe('interaction', () => {
  it('calls onChange when the label area is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Switch aria-label="Enable notifications" onChange={onChange} />);
    const label = container.querySelector('label')!;
    await user.click(label);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange when Space is pressed while focused', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch aria-label="Enable notifications" onChange={onChange} />);
    screen.getByRole('checkbox').focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalled();
  });
});

describe('error state', () => {
  it('sets aria-invalid on the checkbox when error is true', () => {
    render(<Switch aria-label="Enable notifications" error />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Switch aria-label="Enable notifications" error={false} />);
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
  });
});

describe('disabled state', () => {
  it('is disabled when the disabled prop is set', () => {
    render(<Switch aria-label="Enable notifications" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Switch aria-label="Enable notifications" disabled onChange={onChange} />,
    );
    const label = container.querySelector('label')!;
    await user.click(label);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('accessibility', () => {
  it('passes axe for default state', async () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for error state', async () => {
    const { container } = render(<Switch aria-label="Enable notifications" error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for disabled state', async () => {
    const { container } = render(<Switch aria-label="Enable notifications" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
