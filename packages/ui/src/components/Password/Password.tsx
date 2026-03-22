import React, { useCallback, useRef, useState } from 'react';
import styles from './Password.module.css';
import { Input } from '../Input';
import { EyeIcon, EyeOffIcon } from '../Icon/icons';

export interface PasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  showLabel: string;
  hideLabel: string;
}

function usePasswordVisibility(forwardedRef: React.ForwardedRef<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const mergedRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  const handleToggle = useCallback(() => {
    setVisible((v) => !v);
    inputRef.current?.focus();
  }, []);

  return { visible, mergedRef, handleToggle };
}

export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ error, showLabel, hideLabel, className, disabled, ...rest }, forwardedRef) => {
    const { visible, mergedRef, handleToggle } = usePasswordVisibility(forwardedRef);

    const inputType = visible ? 'text' : 'password';
    const toggleAriaLabel = visible ? hideLabel : showLabel;
    const toggleIcon = visible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />;

    return (
      <div className={styles.root}>
        <Input
          ref={mergedRef}
          type={inputType}
          error={error}
          className={className}
          disabled={disabled}
          {...rest}
        />
        <button
          type="button"
          className={styles.toggle}
          aria-label={toggleAriaLabel}
          disabled={disabled}
          onClick={handleToggle}
        >
          {toggleIcon}
        </button>
      </div>
    );
  },
);

Password.displayName = 'Password';
