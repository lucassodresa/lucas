import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Form } from './Form';

describe('rendering', () => {
  it('renders a form element', () => {
    const { container } = render(<Form onSubmit={vi.fn()} />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('sets noValidate to disable native browser validation', () => {
    const { container } = render(<Form onSubmit={vi.fn()} />);
    expect(container.querySelector('form')).toHaveAttribute('novalidate');
  });

  it('renders children', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <span data-testid="child" />
      </Form>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<Form onSubmit={vi.fn()} className="custom" />);
    expect(container.querySelector('form')).toHaveClass('custom');
  });
});

describe('submission', () => {
  it('calls onSubmit when the form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('accessibility', () => {
  it('passes axe', async () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <button type="submit">Submit</button>
      </Form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
