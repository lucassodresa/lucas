import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('rendering', () => {
  it('renders a checkbox', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('forwards ref to the input element via an object ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Accept terms" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards ref to the input element via a callback ref', () => {
    let refValue: HTMLInputElement | null = null;
    render(
      <Checkbox
        ref={(el) => {
          refValue = el;
        }}
        aria-label="Accept terms"
      />,
    );
    expect(refValue).toBeInstanceOf(HTMLInputElement);
  });

  it('renders without a ref', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('controlled behaviour', () => {
  it('reflects checked={true} in the DOM', () => {
    render(<Checkbox aria-label="Accept terms" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox aria-label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });
});

describe('error state', () => {
  it('sets aria-invalid when error is true', () => {
    render(<Checkbox aria-label="Accept terms" error />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Checkbox aria-label="Accept terms" error={false} />);
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-invalid');
  });
});

describe('disabled state', () => {
  it('is disabled when the disabled prop is set', () => {
    render(<Checkbox aria-label="Accept terms" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox aria-label="Accept terms" disabled onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('indeterminate state', () => {
  it('sets the indeterminate property on the DOM element when true', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Select all" indeterminate />);
    expect(ref.current?.indeterminate).toBe(true);
  });

  it('clears the indeterminate property when the prop is false', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Select all" indeterminate={false} />);
    expect(ref.current?.indeterminate).toBe(false);
  });

  it('fires onChange when clicked while indeterminate — does not self-toggle indeterminate', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox
        ref={ref}
        aria-label="Select all"
        indeterminate
        checked={false}
        onChange={onChange}
      />,
    );
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });
});

describe('accessibility', () => {
  it('passes axe for default state', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for error state', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for disabled state', async () => {
    const { container } = render(<Checkbox aria-label="Accept terms" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
