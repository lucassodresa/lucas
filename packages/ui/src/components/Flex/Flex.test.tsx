import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Flex } from './Flex';
import styles from './Flex.module.css';

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
    'direction="%s" applies the correct class',
    (direction) => {
      render(
        <Flex data-testid="flex" direction={direction}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toHaveClass(styles[`direction-${direction}`]);
    },
  );
});

describe('align and justify props', () => {
  it.each(['start', 'center', 'end', 'stretch', 'baseline'] as const)(
    'align="%s" applies the correct class',
    (align) => {
      render(
        <Flex data-testid="flex" align={align}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toHaveClass(styles[`align-${align}`]);
    },
  );

  it.each(['start', 'center', 'end', 'between', 'around', 'evenly'] as const)(
    'justify="%s" applies the correct class',
    (justify) => {
      render(
        <Flex data-testid="flex" justify={justify}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toHaveClass(styles[`justify-${justify}`]);
    },
  );
});

describe('wrap prop', () => {
  it.each(['nowrap', 'wrap', 'wrap-reverse'] as const)(
    'wrap="%s" applies the correct class',
    (wrap) => {
      render(
        <Flex data-testid="flex" wrap={wrap}>
          content
        </Flex>,
      );
      expect(screen.getByTestId('flex')).toHaveClass(styles[`wrap-${wrap}`]);
    },
  );
});

describe('gap props', () => {
  it('gap={4} applies gap class', () => {
    render(
      <Flex data-testid="flex" gap={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles['gap-4']);
  });

  it('gapX={4} applies gapX class', () => {
    render(
      <Flex data-testid="flex" gapX={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles['gapX-4']);
  });

  it('gapY={4} applies gapY class', () => {
    render(
      <Flex data-testid="flex" gapY={4}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles['gapY-4']);
  });

  it('gapX={2} with gap={4} both applied', () => {
    render(
      <Flex data-testid="flex" gap={4} gapX={2}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles['gap-4']);
    expect(screen.getByTestId('flex')).toHaveClass(styles['gapX-2']);
  });
});

describe('boolean modifiers', () => {
  it('inline={true} applies inline class', () => {
    render(
      <Flex data-testid="flex" inline={true}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles.inline);
  });

  it('inline={false} does not apply inline class', () => {
    render(
      <Flex data-testid="flex" inline={false}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).not.toHaveClass(styles.inline);
  });

  it('grow={true} applies grow class', () => {
    render(
      <Flex data-testid="flex" grow={true}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).toHaveClass(styles.grow);
  });

  it('grow={false} does not apply grow class', () => {
    render(
      <Flex data-testid="flex" grow={false}>
        content
      </Flex>,
    );
    expect(screen.getByTestId('flex')).not.toHaveClass(styles.grow);
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
