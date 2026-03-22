import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Form } from '../Form/Form';
import { Field } from './Field';
import { Input as RealInput } from '../Input/Input';
import { Password as RealPassword } from '../Password/Password';
import { Checkbox as RealCheckbox } from '../Checkbox/Checkbox';
import { Select as RealSelect } from '../Select/Select';
import { Switch as RealSwitch } from '../Switch/Switch';

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ error: _, ...props }, ref) => <input ref={ref} {...props} />);
Input.displayName = 'Input';

describe('label and control association', () => {
  it('renders the label with htmlFor matching the control id', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email">
          <Input />
        </Field>
      </Form>,
    );
    expect(screen.getByText('Email')).toHaveAttribute('for', 'field-email');
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('id', 'field-email');
  });

  it('renders the label before the control in DOM order', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="username" label="Username">
          <Input />
        </Field>
      </Form>,
    );
    const label = screen.getByText('Username').closest('label')!;
    const input = screen.getByRole('textbox', { name: 'Username' });
    const position = label.compareDocumentPosition(input);
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('form submission', () => {
  it('passes field values to onSubmit on valid submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <Field name="email" label="Email">
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' }, expect.anything());
  });

  it('shows independent errors for multiple required fields on submit', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email required' }}>
          <Input />
        </Field>
        <Field name="password" label="Password" rules={{ required: 'Password required' }}>
          <Input type="password" />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email required')).toBeInTheDocument();
    expect(screen.getByText('Password required')).toBeInTheDocument();
  });

  it('calls onSubmit and shows no error when an optional field is left empty', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit}>
        <Field name="nickname" label="Nickname">
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('textbox', { name: 'Nickname' })).not.toHaveAttribute('aria-describedby');
  });

  it('shows the first failing rule message when multiple rules fail', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field
          name="email"
          label="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          }}
        >
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });
});

describe('validation errors — initial render', () => {
  it('renders no error element before any submission', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
      </Form>,
    );
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('does not set aria-describedby on the control before any error', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
      </Form>,
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-describedby');
  });

  it('has no error element and no aria-describedby after submitting a field with no rules', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="nickname" label="Nickname">
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    const control = screen.getByRole('textbox', { name: 'Nickname' });
    expect(control).not.toHaveAttribute('aria-describedby');
    expect(document.getElementById('field-nickname-error')).not.toBeInTheDocument();
  });

  it('does not show an error when the user focuses and blurs before submitting', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('textbox', { name: 'Email' }));
    await user.tab();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });
});

describe('validation errors — after submit', () => {
  it('shows error message below the control after submitting with a required empty field', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('sets aria-describedby on the control and id on the error element', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
      'aria-describedby',
      'field-email-error',
    );
    expect(screen.getByText('Email is required')).toHaveAttribute('id', 'field-email-error');
  });
});

describe('revalidation after submit', () => {
  it('clears error when the user enters a valid value and blurs', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'test@example.com');
    await user.tab();
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('keeps error when the user blurs without entering a value after submit', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    await user.click(screen.getByRole('textbox', { name: 'Email' }));
    await user.tab();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});

describe('outside Form context', () => {
  it('calls console.error when used without a parent Form', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <Field name="email" label="Email">
        <Input />
      </Field>,
    );
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('five-control composition', () => {
  it('registers, validates, and shows errors for all five 001-004 control types', async () => {
    const user = userEvent.setup();
    render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email error' }}>
          <RealInput />
        </Field>
        <Field name="password" label="Password" rules={{ required: 'Password error' }}>
          <RealPassword showLabel="Show" hideLabel="Hide" />
        </Field>
        <Field name="terms" label="Terms" rules={{ required: 'Terms error' }}>
          <RealCheckbox />
        </Field>
        <Field name="country" label="Country" rules={{ required: 'Country error' }}>
          <RealSelect>
            <option value="">Pick one</option>
            <option value="us">US</option>
          </RealSelect>
        </Field>
        <Field name="notifications" label="Notifications" rules={{ required: 'Notifications error' }}>
          <RealSwitch />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText('Email error')).toBeInTheDocument();
    expect(screen.getByText('Password error')).toBeInTheDocument();
    expect(screen.getByText('Terms error')).toBeInTheDocument();
    expect(screen.getByText('Country error')).toBeInTheDocument();
    expect(screen.getByText('Notifications error')).toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it('passes axe on initial render', async () => {
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input type="email" />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe when a validation error is shown', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Form onSubmit={vi.fn()}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input type="email" />
        </Field>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
