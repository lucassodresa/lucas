import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('default element inference', () => {
  it.each([
    ['heading-xl', 'H1'],
    ['heading-l', 'H2'],
    ['heading-m', 'H3'],
    ['heading-s', 'H4'],
    ['body-l', 'P'],
    ['body', 'P'],
    ['body-s', 'P'],
  ] as const)('size="%s" renders <%s>', (size, tag) => {
    render(<Text size={size}>content</Text>);
    expect(screen.getByText('content').tagName).toBe(tag);
  });

  it('no size prop renders <p> (default is body)', () => {
    render(<Text>content</Text>);
    expect(screen.getByText('content').tagName).toBe('P');
  });
});

describe('as prop override', () => {
  it('size="heading-l" as="h1" renders <h1>', () => {
    render(
      <Text size="heading-l" as="h1">
        Heading
      </Text>,
    );
    expect(screen.getByText('Heading').tagName).toBe('H1');
  });

  it('size="body" as="span" renders <span>', () => {
    render(
      <Text size="body" as="span">
        Body
      </Text>,
    );
    expect(screen.getByText('Body').tagName).toBe('SPAN');
  });

  it('size="body-s" as="label" renders <label>', () => {
    render(
      <Text size="body-s" as="label">
        Label
      </Text>,
    );
    expect(screen.getByText('Label').tagName).toBe('LABEL');
  });
});

describe('rendering', () => {
  it('renders children as text content', () => {
    render(<Text>Hello world</Text>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Text className="custom-class">Text</Text>);
    expect(screen.getByText('Text')).toHaveClass('custom-class');
  });

  it('forwards id', () => {
    render(<Text id="my-text">Text</Text>);
    expect(screen.getByText('Text')).toHaveAttribute('id', 'my-text');
  });

  it('truncate renders an accessible element', async () => {
    const { container } = render(<Text truncate>Long text that should be truncated</Text>);
    expect(screen.getByText('Long text that should be truncated')).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each(['regular', 'medium', 'semibold', 'bold'] as const)(
    'weight="%s" renders without error',
    async (weight) => {
      const { container } = render(<Text weight={weight}>Weighted text</Text>);
      expect(screen.getByText('Weighted text')).toBeInTheDocument();
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

describe('color prop', () => {
  it.each(['default', 'muted', 'secondary'] as const)(
    'color="%s" renders without error',
    async (color) => {
      const { container } = render(<Text color={color}>Colored text</Text>);
      expect(screen.getByText('Colored text')).toBeInTheDocument();
      expect(await axe(container)).toHaveNoViolations();
    },
  );
});

describe('accessibility', () => {
  it.each([
    'heading-xl',
    'heading-l',
    'heading-m',
    'heading-s',
    'body-l',
    'body',
    'body-s',
  ] as const)('passes axe for size="%s"', async (size) => {
    const { container } = render(<Text size={size}>Sample text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="label" with htmlFor and matching input', async () => {
    const { container } = render(
      <>
        <Text as="label" htmlFor="x" size="body-s">
          Name
        </Text>
        <input id="x" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="span"', async () => {
    const { container } = render(<Text as="span">Inline text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
