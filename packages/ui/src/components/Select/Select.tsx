import React from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...rest }, ref) => {
    const ariaInvalid = error ? true : undefined;
    const selectClassNames = clsx(styles.select, error && styles['select--error'], className);

    return (
      <div className={styles.wrapper}>
        <select ref={ref} aria-invalid={ariaInvalid} className={selectClassNames} {...rest}>
          {children}
        </select>
      </div>
    );
  },
);

Select.displayName = 'Select';
