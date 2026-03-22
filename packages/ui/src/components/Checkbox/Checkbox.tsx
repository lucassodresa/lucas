import React, { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  indeterminate?: boolean;
}

function useIndeterminateRef(
  indeterminate: boolean | undefined,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return mergedRef;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ error, indeterminate, className, ...rest }, forwardedRef) => {
    const mergedRef = useIndeterminateRef(indeterminate, forwardedRef);
    const ariaInvalid = error ? true : undefined;
    const classNames = clsx(styles.checkbox, error && styles['checkbox--error'], className);

    return (
      <input
        ref={mergedRef}
        type="checkbox"
        aria-invalid={ariaInvalid}
        className={classNames}
        {...rest}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
