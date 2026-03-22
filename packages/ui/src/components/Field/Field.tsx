import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { RegisterOptions, FieldError } from 'react-hook-form';
import styles from './Field.module.css';

export interface FieldProps {
  name: string;
  label: string;
  rules?: RegisterOptions;
  children: React.ReactElement;
}

export function Field({ name, label, rules, children }: FieldProps) {
  const context = useFormContext();
  const fieldId = `field-${name}`;
  const errorId = `field-${name}-error`;

  if (!context) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Field "${name}" must be used within a <Form> component.`);
    }
    return (
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        {children}
      </div>
    );
  }

  const {
    register,
    formState: { errors },
  } = context;
  const error = errors[name] as FieldError | undefined;
  const registration = register(name, rules);

  const clonedChild = React.cloneElement(children, {
    ...registration,
    id: fieldId,
    ...(error && {
      'aria-describedby': errorId,
      error: true,
    }),
  });

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
      </label>
      {clonedChild}
      {error && (
        <span id={errorId} className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  );
}
