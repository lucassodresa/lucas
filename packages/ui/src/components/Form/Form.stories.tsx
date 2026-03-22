import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { Field } from '../Field/Field';
import { Input } from '../Input/Input';
import { Password } from '../Password/Password';
import { Checkbox } from '../Checkbox/Checkbox';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  args: {
    onSubmit: () => {},
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  render: () => (
    <Form onSubmit={(data) => alert(JSON.stringify(data, null, 2))}>
      <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Button type="submit">Submit</Button>
    </Form>
  ),
};

export const ValidationErrors: Story = {
  render: () => (
    <Form onSubmit={(data) => alert(JSON.stringify(data, null, 2))}>
      <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field
        name="password"
        label="Password"
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
        }}
      >
        <Password showLabel="Show password" hideLabel="Hide password" />
      </Field>
      <Field name="terms" label="I agree to the terms" rules={{ required: 'You must agree' }}>
        <Checkbox />
      </Field>
      <Button type="submit">Submit without filling in fields to see errors</Button>
    </Form>
  ),
};

export const ServerError: Story = {
  render: () => (
    <div>
      <div
        role="alert"
        style={{
          padding: '12px 16px',
          background: 'var(--color-danger-subtle)',
          border: '1px solid var(--color-danger-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-danger-text)',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        This email address is already registered.
      </div>
      <Form onSubmit={() => {}}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Button type="submit">Try again</Button>
      </Form>
    </div>
  ),
};

export const LoginForm: Story = {
  render: () => (
    <div style={{ maxWidth: '360px' }}>
      <Form onSubmit={(data) => alert(JSON.stringify(data, null, 2))}>
        <Field name="email" label="Email" rules={{ required: 'Email is required' }}>
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Field name="password" label="Password" rules={{ required: 'Password is required' }}>
          <Password showLabel="Show password" hideLabel="Hide password" />
        </Field>
        <Button type="submit">Sign in</Button>
      </Form>
    </div>
  ),
};
