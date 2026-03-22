import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  preventDoubleClick?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  className?: string;
}

interface ButtonWithChildren extends ButtonBaseProps {
  children: React.ReactNode;
  'aria-label'?: string;
}

interface ButtonWithoutChildren extends ButtonBaseProps {
  children?: never;
  'aria-label': string;
}

export type ButtonProps = ButtonWithChildren | ButtonWithoutChildren;

function useSubmitCooldown(duration = 1000) {
  const [cooling, setCooling] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const trigger = useCallback(() => {
    setCooling(true);
    timerRef.current = setTimeout(() => {
      setCooling(false);
    }, duration);
  }, [duration]);

  return { cooling, trigger } as const;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  preventDoubleClick = false,
  href,
  type = 'button',
  disabled = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  className,
}: ButtonProps, ref) {
  const { cooling, trigger } = useSubmitCooldown();

  const childrenLabel = typeof children === 'string' ? children : undefined;
  const effectiveAriaLabel = isLoading ? (ariaLabel ?? childrenLabel) : ariaLabel;

  const isEffectivelyDisabled = disabled || isLoading || cooling;
  const hasHref = href !== undefined;
  const isSubmit = type === 'submit';
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!hasHref && isSubmit && preventDoubleClick) {
        trigger();
      }
      onClick?.(e);
    },
    [hasHref, isSubmit, preventDoubleClick, onClick, trigger],
  );

  // Space activates role=button anchors per ARIA spec (browsers only fire click
  // on Enter for <a> elements). preventDefault suppresses the default scroll.
  // Cast is required: KeyboardEvent is not a MouseEvent. onClick consumers
  // must not rely on mouse-coordinate properties (clientX, clientY, etc.).
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLAnchorElement>);
      }
    },
    [onClick],
  );

  const classNames = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    isLoading && styles['button--loading'],
    leftIcon && !isLoading && styles['button--has-left-icon'],
    rightIcon && !isLoading && styles['button--has-right-icon'],
    className,
  );

  const content = isLoading ? (
    <Spinner size={size} />
  ) : (
    <>
      {leftIcon && <Icon>{leftIcon}</Icon>}
      {children}
      {rightIcon && <Icon>{rightIcon}</Icon>}
    </>
  );

  const ariaDisabled = isEffectivelyDisabled || undefined;
  const ariaBusy = isLoading || undefined;
  const resolvedHref = isEffectivelyDisabled ? undefined : href;

  if (hasHref) {
    return (
      <a
        href={resolvedHref}
        role="button"
        draggable={false}
        aria-disabled={ariaDisabled}
        aria-busy={ariaBusy}
        aria-label={effectiveAriaLabel}
        className={classNames}
        onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
        onKeyDown={handleKeyDown}
        onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
        onFocus={onFocus as React.FocusEventHandler<HTMLAnchorElement>}
        onBlur={onBlur as React.FocusEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isEffectivelyDisabled}
      aria-disabled={ariaDisabled}
      aria-busy={ariaBusy}
      aria-label={effectiveAriaLabel}
      className={classNames}
      onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
      onMouseEnter={onMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
      onMouseLeave={onMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
      onFocus={onFocus as React.FocusEventHandler<HTMLButtonElement>}
      onBlur={onBlur as React.FocusEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
});
