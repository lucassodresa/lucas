import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('rendering', () => {
  it('renders a text input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('passes through standard HTML input props', () => {
    render(<Input placeholder="Enter text" id="name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('id', 'name');
  });
});

describe('controlled behaviour', () => {
  it('calls onChange when the user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards name and onBlur from RHF register spread', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    render(<Input name="email" onBlur={onBlur} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'email');
    await user.click(input);
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });
});

describe('error state', () => {
  it('sets aria-invalid when error is true', () => {
    render(<Input error />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Input error={false} />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });
});

describe('disabled state', () => {
  it('is disabled when the disabled prop is set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input disabled onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('accessibility', () => {
  it('passes axe for default state', async () => {
    const { container } = render(<Input aria-label="Name" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for error state', async () => {
    const { container } = render(<Input aria-label="Name" error />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for disabled state', async () => {
    const { container } = render(<Input aria-label="Name" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
