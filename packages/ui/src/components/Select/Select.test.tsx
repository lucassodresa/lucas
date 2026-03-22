import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

describe('rendering', () => {
  it('renders a combobox', () => {
    render(
      <Select aria-label="Colour">
        <option value="red">Red</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('forwards ref to the select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Colour">
        <option value="red">Red</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('renders children as options', () => {
    render(
      <Select aria-label="Colour">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>,
    );
    expect(screen.getByRole('option', { name: 'Red' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Blue' })).toBeInTheDocument();
  });
});

describe('controlled behaviour', () => {
  it('calls onChange when the user selects an option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select aria-label="Colour" onChange={onChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox'), 'blue');
    expect(onChange).toHaveBeenCalled();
  });
});

describe('error state', () => {
  it('sets aria-invalid when error is true', () => {
    render(
      <Select aria-label="Colour" error>
        <option value="red">Red</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(
      <Select aria-label="Colour" error={false}>
        <option value="red">Red</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
  });
});

describe('disabled state', () => {
  it('is disabled when the disabled prop is set', () => {
    render(
      <Select aria-label="Colour" disabled>
        <option value="red">Red</option>
      </Select>,
    );
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select aria-label="Colour" disabled onChange={onChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox'), 'blue');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('accessibility', () => {
  it('passes axe for default state', async () => {
    const { container } = render(
      <Select aria-label="Colour">
        <option value="red">Red</option>
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for error state', async () => {
    const { container } = render(
      <Select aria-label="Colour" error>
        <option value="red">Red</option>
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for disabled state', async () => {
    const { container } = render(
      <Select aria-label="Colour" disabled>
        <option value="red">Red</option>
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
