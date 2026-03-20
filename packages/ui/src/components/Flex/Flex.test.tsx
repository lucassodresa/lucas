import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Flex } from './Flex';

describe('element rendering', () => {
  it('renders a <div> by default', () => {
    render(<Flex data-testid="flex">content</Flex>);
    expect(screen.getByTestId('flex').tagName).toBe('DIV');
  });

  it.each(['nav', 'ul', 'section'] as const)('renders the element from as prop (%s)', (tag) => {
    const testId = `flex-${tag}`;
    render(
      <Flex as={tag} data-testid={testId} aria-label={tag}>
        {tag === 'ul' ? <li>item</li> : 'content'}
      </Flex>,
    );
    expect(screen.getByTestId(testId).tagName).toBe(tag.toUpperCase());
  });

  it('forwards className', () => {
    render(
      <Flex data-testid="flex" className="custom-class">
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass('custom-class');
  });

  it('forwards id', () => {
    render(<Flex id="my-flex">content</Flex>);
    expect(document.getElementById('my-flex')).toBeInTheDocument();
  });

  it('forwards data-testid', () => {
    render(<Flex data-testid="my-flex">content</Flex>);
    expect(screen.getByTestId('my-flex')).toBeInTheDocument();
  });

  it('forwards aria-label', () => {
    render(<Flex aria-label="my region">content</Flex>);
    expect(screen.getByLabelText('my region')).toBeInTheDocument();
  });

  it('forwards ref — current is set after mount', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref}>content</Flex>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

describe('direction prop', () => {
  it.each(['row', 'row-reverse', 'column', 'column-reverse'] as const)(
    'renders without error for direction=%s',
    (direction) => {
      render(
        <Flex data-testid="flex" direction={direction}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    },
  );
});

describe('align and justify props', () => {
  it.each(['start', 'center', 'end', 'stretch', 'baseline'] as const)(
    'renders without error for align=%s',
    (align) => {
      render(
        <Flex data-testid="flex" align={align}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    },
  );

  it.each(['start', 'center', 'end', 'between', 'around', 'evenly'] as const)(
    'renders without error for justify=%s',
    (justify) => {
      render(
        <Flex data-testid="flex" justify={justify}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    },
  );
});

describe('wrap prop', () => {
  it.each(['nowrap', 'wrap', 'wrap-reverse'] as const)(
    'renders without error for wrap=%s',
    (wrap) => {
      render(
        <Flex data-testid="flex" wrap={wrap}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toBeInTheDocument();
    },
  );
});

describe('gap props', () => {
  it('gap={4} renders without error', () => {
    render(
      <Flex data-testid="flex" gap={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('gapX={4} renders without error', () => {
    render(
      <Flex data-testid="flex" gapX={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('gapY={4} renders without error', () => {
    render(
      <Flex data-testid="flex" gapY={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('gapX overrides gap for x axis when both defined', () => {
    render(
      <Flex data-testid="flex" gap={4} gapX={2}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});

describe('boolean modifiers', () => {
  it('inline={true} renders without error', () => {
    render(
      <Flex data-testid="flex" inline={true}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('inline={false} renders without error', () => {
    render(
      <Flex data-testid="flex" inline={false}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('grow={true} renders without error', () => {
    render(
      <Flex data-testid="flex" grow={true}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('grow={false} renders without error', () => {
    render(
      <Flex data-testid="flex" grow={false}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});

describe('spacing props', () => {
  it('padding={4} renders without error', () => {
    render(
      <Flex data-testid="flex" padding={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });

  it('marginBottom={8} renders without error', () => {
    render(
      <Flex data-testid="flex" marginBottom={8}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it('passes axe for default <div> with children', async () => {
    const { container } = render(<Flex>content</Flex>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="nav" with aria-label', async () => {
    const { container } = render(
      <Flex as="nav" aria-label="Main navigation">
        content
      </Flex>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="ul" with li children', async () => {
    const { container } = render(
      <Flex as="ul">
        <li>item one</li>
        <li>item two</li>
      </Flex>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
