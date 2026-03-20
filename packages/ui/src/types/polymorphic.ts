import React from 'react';

export type AsProp<E extends React.ElementType> = {
  as?: E;
};

export type PropsWithAs<E extends React.ElementType, P = object> = P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | 'as'>;

export type PolymorphicRef<E extends React.ElementType> = React.ComponentPropsWithRef<E>['ref'];

export type PolymorphicPropsWithRef<E extends React.ElementType, P = object> = PropsWithAs<E, P> & {
  ref?: PolymorphicRef<E>;
};

export type PolymorphicComponent<DefaultElement extends React.ElementType, OwnProps = object> = <
  E extends React.ElementType = DefaultElement,
>(
  props: PolymorphicPropsWithRef<E, OwnProps>,
) => React.ReactElement | null;
