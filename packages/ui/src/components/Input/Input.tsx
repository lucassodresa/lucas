import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...rest }, ref) => {
    const ariaInvalid = error ? true : undefined;
    const classNames = clsx(styles.input, error && styles['input--error'], className);

    return <input ref={ref} aria-invalid={ariaInvalid} className={classNames} {...rest} />;
  },
);

Input.displayName = 'Input';
