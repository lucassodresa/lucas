import React from 'react';
import clsx from 'clsx';
import styles from './Text.module.css';
import type {
  PolymorphicComponent,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from '../../types/polymorphic';

export type TextSize =
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'body-l'
  | 'body'
  | 'body-s';

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label'
  | 'legend'
  | 'caption'
  | 'figcaption'
  | 'time'
  | 'strong'
  | 'em';

export type TextColor = 'default' | 'muted' | 'secondary';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export interface TextOwnProps {
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export type TextProps<E extends TextElement = 'p'> = PolymorphicPropsWithRef<E, TextOwnProps>;

const defaultElementForSize: Record<TextSize, TextElement> = {
  'heading-xl': 'h1',
  'heading-l': 'h2',
  'heading-m': 'h3',
  'heading-s': 'h4',
  'body-l': 'p',
  body: 'p',
  'body-s': 'p',
};

function TextInner<E extends TextElement = 'p'>(
  {
    as,
    size = 'body',
    color = 'default',
    weight,
    truncate,
    className,
    children,
    ...rest
  }: TextProps<E>,
  ref: PolymorphicRef<E>,
) {
  const Element = (as ?? defaultElementForSize[size]) as React.ElementType;

  const sizeClass = styles[size];
  const colorClass = styles[`color-${color}`];
  const weightClass = weight !== undefined ? styles[`weight-${weight}`] : undefined;
  const truncateClass = truncate ? styles.truncate : undefined;

  const classNames = clsx(
    styles.text,
    sizeClass,
    colorClass,
    weightClass,
    truncateClass,
    className,
  );

  return (
    <Element ref={ref} className={classNames} {...rest}>
      {children}
    </Element>
  );
}

export const Text = React.forwardRef(
  TextInner as (props: TextProps<'p'>, ref: PolymorphicRef<'p'>) => React.ReactElement | null,
) as unknown as PolymorphicComponent<'p', TextOwnProps>;
