import React, { useId } from 'react';
import clsx from 'clsx';
import { Overlay } from '../Overlay';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  side?: DrawerSide;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ isOpen, onClose, title, side = 'right', children, className }: DrawerProps) {
  const titleId = useId();

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={clsx(styles.drawer, styles[`drawer--${side}`], className)}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {children}
      </div>
    </Overlay>
  );
}
