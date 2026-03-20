import React from 'react';
import clsx from 'clsx';
import styles from './Icon.module.css';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconColor = 'inherit' | 'primary' | 'muted' | 'success' | 'warning' | 'danger';

export interface IconProps {
  children: React.ReactNode;
  size?: IconSize;
  color?: IconColor;
}

export function Icon({ children, size, color = 'inherit' }: IconProps) {
  return (
    <span
      className={clsx(
        styles.icon,
        size && styles[`icon--${size}`],
        color !== 'inherit' && styles[`icon--${color}`],
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
