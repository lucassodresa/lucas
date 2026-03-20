import React from 'react';
import clsx from 'clsx';
import styles from './Flex.module.css';
import { resolveSpacingClasses } from '../../utils/spacing';
import type {
  PolymorphicComponent,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from '../../types/polymorphic';
import type { SpacingProps } from '../../utils/spacing';
import type { SpacingScale } from '../../types/spacing';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface FlexOwnProps extends SpacingProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: SpacingScale;
  gapX?: SpacingScale;
  gapY?: SpacingScale;
  inline?: boolean;
  grow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type FlexProps<E extends React.ElementType = 'div'> = PolymorphicPropsWithRef<
  E,
  FlexOwnProps
>;

function FlexInner<E extends React.ElementType = 'div'>(
  {
    as,
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    wrap = 'nowrap',
    gap,
    gapX,
    gapY,
    inline,
    grow,
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
  }: FlexProps<E>,
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

  const gapClass = gap !== undefined ? styles[`gap-${gap}`] : undefined;
  const gapXClass = gapX !== undefined ? styles[`gapX-${gapX}`] : undefined;
  const gapYClass = gapY !== undefined ? styles[`gapY-${gapY}`] : undefined;
  const inlineClass = inline ? styles.inline : undefined;
  const growClass = grow ? styles.grow : undefined;

  const classNames = clsx(
    styles.flex,
    styles[`direction-${direction}`],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    styles[`wrap-${wrap}`],
    gapClass,
    gapXClass,
    gapYClass,
    inlineClass,
    growClass,
    spacingClassKeys.map((key) => styles[key]),
    className,
  );

  return <Element ref={ref} className={classNames} {...rest} />;
}

export const Flex = React.forwardRef(
  FlexInner as (props: FlexProps<'div'>, ref: PolymorphicRef<'div'>) => React.ReactElement | null,
) as unknown as PolymorphicComponent<'div', FlexOwnProps>;
