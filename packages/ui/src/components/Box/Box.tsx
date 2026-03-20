import React from 'react';
import clsx from 'clsx';
import styles from './Box.module.css';
import { resolveSpacingClasses } from '../../utils/spacing';
import type {
  PolymorphicComponent,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from '../../types/polymorphic';
import type { SpacingProps } from '../../utils/spacing';

type BoxOwnProps = SpacingProps & {
  className?: string;
};

export type BoxProps<E extends React.ElementType = 'div'> = PolymorphicPropsWithRef<E, BoxOwnProps>;

function BoxInner<E extends React.ElementType = 'div'>(
  {
    as,
    className,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    ...rest
  }: BoxProps<E>,
  ref: PolymorphicRef<E>,
) {
  const Element = (as ?? 'div') as React.ElementType;

  const spacingClassKeys = resolveSpacingClasses({
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  });

  const classNames = clsx(
    styles.box,
    spacingClassKeys.map((key) => styles[key]),
    className,
  );

  return <Element ref={ref} className={classNames} {...rest} />;
}

export const Box = React.forwardRef(
  BoxInner as (props: BoxProps<'div'>, ref: PolymorphicRef<'div'>) => React.ReactElement | null,
) as unknown as PolymorphicComponent<'div', BoxOwnProps>;
