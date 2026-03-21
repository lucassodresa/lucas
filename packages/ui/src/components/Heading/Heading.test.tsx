import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('default render', () => {
  it('renders <h2> by default', () => {
    render(<Heading>Heading text</Heading>);
    expect(screen.getByText('Heading text').tagName).toBe('H2');
  });

  it('renders children as text content', () => {
    render(<Heading>Section title</Heading>);
    expect(screen.getByText('Section title')).toBeInTheDocument();
  });
});

describe('size prop', () => {
  it.each([['xl'], ['l'], ['m'], ['s']] as const)('size="%s" renders <h2> by default', (size) => {
    render(<Heading size={size}>Heading text</Heading>);
    expect(screen.getByText('Heading text').tagName).toBe('H2');
  });
});

describe('as prop', () => {
  it('as="h1" renders <h1>', () => {
    render(<Heading as="h1">Heading</Heading>);
    expect(screen.getByText('Heading').tagName).toBe('H1');
  });

  it('as="h6" renders <h6>', () => {
    render(<Heading as="h6">Heading</Heading>);
    expect(screen.getByText('Heading').tagName).toBe('H6');
  });

  it('as="h3" size="xl" renders <h3> (semantic and visual are independent)', () => {
    render(
      <Heading as="h3" size="xl">
        Heading
      </Heading>,
    );
    expect(screen.getByText('Heading').tagName).toBe('H3');
  });
});

describe('forwarded props', () => {
  it('weight="medium" renders without error', async () => {
    const { container } = render(<Heading weight="medium">Heading</Heading>);
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('color="muted" renders without error', async () => {
    const { container } = render(<Heading color="muted">Heading</Heading>);
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('truncate={true} renders without error', async () => {
    const { container } = render(<Heading truncate>Long heading text</Heading>);
    expect(screen.getByText('Long heading text')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('forwards custom className', () => {
    render(<Heading className="custom-class">Heading</Heading>);
    expect(screen.getByText('Heading')).toHaveClass('custom-class');
  });
});

describe('ref forwarding', () => {
  it('forwards ref to the heading element', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<Heading ref={ref}>Heading</Heading>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('H2');
  });

  it('forwards ref to the correct element when as is overridden', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(
      <Heading as="h4" ref={ref}>
        Heading
      </Heading>,
    );
    expect(ref.current?.tagName).toBe('H4');
  });
});

describe('accessibility', () => {
  it.each([['xl'], ['l'], ['m'], ['s']] as const)(
    'passes axe for size="%s" with default element',
    async (size) => {
      const { container } = render(<Heading size={size}>Heading text</Heading>);
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it('passes axe for as="h1"', async () => {
    const { container } = render(<Heading as="h1">Page title</Heading>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="h6"', async () => {
    const { container } = render(<Heading as="h6">Small heading</Heading>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for semantic and visual mismatch (as="h3" size="xl")', async () => {
    const { container } = render(
      <Heading as="h3" size="xl">
        Heading
      </Heading>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
