import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Password } from './Password';

const defaultProps = {
  showLabel: 'Show password',
  hideLabel: 'Hide password',
};

describe('rendering', () => {
  it('renders a password input by default', () => {
    render(<Password {...defaultProps} aria-label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('renders the show toggle button with showLabel', () => {
    render(<Password {...defaultProps} aria-label="Password" />);
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Password ref={ref} {...defaultProps} aria-label="Password" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('forwards callback ref to the input element', () => {
    let captured: HTMLInputElement | null = null;
    render(
      <Password
        ref={(node) => {
          captured = node;
        }}
        {...defaultProps}
        aria-label="Password"
      />,
    );
    expect(captured).toBeInstanceOf(HTMLInputElement);
  });

  it('works without a forwarded ref', () => {
    expect(() => render(<Password {...defaultProps} aria-label="Password" />)).not.toThrow();
  });
});

describe('visibility toggle', () => {
  it('switches input type to text when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<Password {...defaultProps} aria-label="Password" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
  });

  it('switches input type back to password when toggle is clicked again', async () => {
    const user = userEvent.setup();
    render(<Password {...defaultProps} aria-label="Password" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    await user.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('updates toggle aria-label to hideLabel when visible', async () => {
    const user = userEvent.setup();
    render(<Password {...defaultProps} aria-label="Password" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
  });

  it('returns focus to the input after toggle', async () => {
    const user = userEvent.setup();
    render(<Password {...defaultProps} aria-label="Password" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password')).toHaveFocus();
  });
});

describe('error state', () => {
  it('sets aria-invalid on the input when error is true', () => {
    render(<Password {...defaultProps} aria-label="Password" error />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Password {...defaultProps} aria-label="Password" error={false} />);
    expect(screen.getByLabelText('Password')).not.toHaveAttribute('aria-invalid');
  });
});

describe('disabled state', () => {
  it('disables the input when disabled prop is set', () => {
    render(<Password {...defaultProps} aria-label="Password" disabled />);
    expect(screen.getByLabelText('Password')).toBeDisabled();
  });

  it('disables the toggle button when disabled prop is set', () => {
    render(<Password {...defaultProps} aria-label="Password" disabled />);
    expect(screen.getByRole('button', { name: 'Show password' })).toBeDisabled();
  });
});

describe('accessibility', () => {
  it('passes axe for default state', async () => {
    const { container } = render(<Password {...defaultProps} aria-label="Password" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for error state', async () => {
    const { container } = render(<Password {...defaultProps} aria-label="Password" error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for disabled state', async () => {
    const { container } = render(<Password {...defaultProps} aria-label="Password" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe when password is visible', async () => {
    const user = userEvent.setup();
    const { container } = render(<Password {...defaultProps} aria-label="Password" />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
