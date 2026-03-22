import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFloating, flip, shift, offset, arrow, FloatingArrow } from '@floating-ui/react';
import { useTooltip } from './useTooltip';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
}

export function Tooltip({ content, children }: TooltipProps) {
  const { isVisible, tooltipId, referenceProps } = useTooltip();
  const arrowRef = useRef<SVGSVGElement>(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    middleware: [offset(12), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
  });

  const childProps = children.props as Record<string, unknown>;
  const isDisabled = Boolean(childProps.disabled);

  const tooltipEl = isVisible
    ? createPortal(
        <div
          ref={refs.setFloating}
          id={tooltipId}
          role="tooltip"
          className={styles.tooltip}
          style={floatingStyles}
        >
          {content}
          <FloatingArrow ref={arrowRef} context={context} className={styles.arrow} />
        </div>,
        document.body,
      )
    : null;

  if (isDisabled) {
    const disabledChild = React.cloneElement(
      children as React.ReactElement<{ style?: React.CSSProperties }>,
      { style: { ...(childProps.style as React.CSSProperties | undefined), pointerEvents: 'none' as const } },
    );
    return (
      <>
        <span
          ref={refs.setReference}
          className={styles.disabledWrapper}
          aria-describedby={isVisible ? tooltipId : undefined}
          {...referenceProps}
        >
          {disabledChild}
        </span>
        {tooltipEl}
      </>
    );
  }

  const trigger = React.cloneElement(children, {
    ref: refs.setReference,
    'aria-describedby': isVisible ? tooltipId : undefined,
    ...referenceProps,
  });

  return (
    <>
      {trigger}
      {tooltipEl}
    </>
  );
}
