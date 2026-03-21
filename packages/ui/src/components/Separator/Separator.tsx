import React from 'react';
import clsx from 'clsx';
import styles from './Separator.module.css';
import type {
  PolymorphicComponent,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from '../../types/polymorphic';

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorOwnProps {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  className?: string;
}

export type SeparatorProps<E extends React.ElementType = 'hr'> = PolymorphicPropsWithRef<
  E,
  SeparatorOwnProps
>;

function SeparatorInner<E extends React.ElementType = 'hr'>(
  { as, orientation = 'horizontal', decorative = true, className, ...rest }: SeparatorProps<E>,
  ref: PolymorphicRef<E>,
) {
  const Element = (as ?? 'hr') as React.ElementType;

  const ariaHidden = decorative ? (true as const) : undefined;
  const ariaOrientation = orientation === 'vertical' ? ('vertical' as const) : undefined;
  const role = decorative ? undefined : 'separator';

  const classNames = clsx(
    styles.separator,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    className,
  );

  return (
    <Element
      ref={ref}
      {...rest}
      className={classNames}
      aria-hidden={ariaHidden}
      aria-orientation={ariaOrientation}
      role={role}
    />
  );
}

export const Separator = React.forwardRef(
  SeparatorInner as (
    props: SeparatorProps<'hr'>,
    ref: PolymorphicRef<'hr'>,
  ) => React.ReactElement | null,
) as unknown as PolymorphicComponent<'hr', SeparatorOwnProps>;
