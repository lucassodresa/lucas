import React from 'react';
import { Text } from '../Text/Text';
import type { TextColor, TextWeight, TextSize } from '../Text/Text';

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xl' | 'l' | 'm' | 's';

export interface HeadingProps {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeMap: Record<HeadingSize, TextSize> = {
  xl: 'heading-xl',
  l: 'heading-l',
  m: 'heading-m',
  s: 'heading-s',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h2', size = 'l', weight, color, truncate, className, children }, ref) => {
    const textSize = sizeMap[size];
    return (
      <Text
        as={as}
        size={textSize}
        weight={weight}
        color={color}
        truncate={truncate}
        className={className}
        ref={ref as React.Ref<HTMLHeadingElement>}
      >
        {children}
      </Text>
    );
  },
);

Heading.displayName = 'Heading';
