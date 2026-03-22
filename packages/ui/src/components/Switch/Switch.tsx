import React from 'react';
import clsx from 'clsx';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ error, className, disabled, ...rest }, ref) => {
    const ariaInvalid = error ? true : undefined;
    const rootClassNames = clsx(
      styles.root,
      error && styles['root--error'],
      disabled && styles['root--disabled'],
      className,
    );

    return (
      <label className={rootClassNames}>
        <input
          ref={ref}
          type="checkbox"
          className={styles.input}
          aria-invalid={ariaInvalid}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
      </label>
    );
  },
);

Switch.displayName = 'Switch';
