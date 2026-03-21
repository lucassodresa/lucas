import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Separator } from './Separator';

describe('element rendering', () => {
  it('renders an <hr> by default', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep').tagName).toBe('HR');
  });

  it('renders the element specified by as="div"', () => {
    render(<Separator as="div" data-testid="sep" />);
    expect(screen.getByTestId('sep').tagName).toBe('DIV');
  });

  it('forwards className', () => {
    render(<Separator data-testid="sep" className="custom-class" />);
    expect(screen.getByTestId('sep')).toHaveClass('custom-class');
  });
});

describe('decorative prop', () => {
  it('sets aria-hidden="true" when decorative=true (default)', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sets aria-hidden="true" when decorative is explicitly true', () => {
    render(<Separator data-testid="sep" decorative={true} />);
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not set aria-hidden when decorative=false', () => {
    render(<Separator data-testid="sep" decorative={false} />);
    expect(screen.getByTestId('sep')).not.toHaveAttribute('aria-hidden');
  });

  it('sets role="separator" when decorative=false', () => {
    render(<Separator data-testid="sep" decorative={false} />);
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'separator');
  });

  it('does not set role when decorative=true', () => {
    render(<Separator data-testid="sep" decorative={true} />);
    expect(screen.getByTestId('sep')).not.toHaveAttribute('role');
  });
});

describe('orientation prop', () => {
  it('does not set aria-orientation when orientation="horizontal" (default)', () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId('sep')).not.toHaveAttribute('aria-orientation');
  });

  it('does not set aria-orientation when orientation is explicitly "horizontal"', () => {
    render(<Separator data-testid="sep" orientation="horizontal" />);
    expect(screen.getByTestId('sep')).not.toHaveAttribute('aria-orientation');
  });

  it('sets aria-orientation="vertical" when orientation="vertical"', () => {
    render(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('aria-orientation', 'vertical');
  });
});

describe('accessibility', () => {
  it('passes axe for horizontal decorative (default)', async () => {
    const { container } = render(<Separator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for vertical decorative', async () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for horizontal semantic', async () => {
    const { container } = render(<Separator decorative={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for vertical semantic', async () => {
    const { container } = render(<Separator orientation="vertical" decorative={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
