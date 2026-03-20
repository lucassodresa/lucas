import React, { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

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

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className={styles.button__icon} aria-hidden="true">
      {children}
    </span>
  );
}

function Spinner() {
  return (
    <svg
      className={styles.spinner}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40 60"
      />
    </svg>
  );
}

function useSubmitCooldown(duration = 1000) {
  const [cooling, setCooling] = useState(false);
  const guardRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const trigger = useCallback(() => {
    if (guardRef.current) return false;
    guardRef.current = true;
    setCooling(true);
    timerRef.current = setTimeout(() => {
      guardRef.current = false;
      setCooling(false);
    }, duration);
    return true;
  }, [duration]);

  return { cooling, trigger } as const;
}

export function Button({
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
  'aria-label': ariaLabel,
  className,
}: ButtonProps) {
  const { cooling, trigger } = useSubmitCooldown();

  const childrenLabel = typeof children === 'string' ? children : undefined;
  const effectiveAriaLabel = isLoading ? (ariaLabel ?? childrenLabel) : ariaLabel;

  const isEffectivelyDisabled = disabled || isLoading || cooling;
  const hasHref = href !== undefined;
  const isSubmit = type === 'submit';
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!hasHref && isEffectivelyDisabled) {
        e.preventDefault();
        return;
      }
      const shouldNotClick = !hasHref && isSubmit && preventDoubleClick && !trigger();
      if (shouldNotClick) {
        return;
      }

      onClick?.(e);
    },
    [hasHref, isSubmit, isEffectivelyDisabled, preventDoubleClick, onClick, trigger],
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
    <Spinner />
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
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isEffectivelyDisabled}
      aria-disabled={ariaDisabled}
      aria-busy={ariaBusy}
      aria-label={effectiveAriaLabel}
      className={classNames}
      onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
