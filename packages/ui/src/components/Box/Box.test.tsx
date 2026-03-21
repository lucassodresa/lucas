import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Box } from './Box';

describe('element rendering', () => {
  it('renders a <div> by default', () => {
    render(<Box data-testid="box">content</Box>);
    expect(screen.getByTestId('box').tagName).toBe('DIV');
  });

  it.each(['section', 'article', 'nav', 'main'] as const)(
    'renders the element specified by as=%s',
    (tag) => {
      render(
        <Box as={tag} data-testid="box">
          content
        </Box>,
      );
      expect(screen.getByTestId('box').tagName).toBe(tag.toUpperCase());
    },
  );

  it('renders as="ul" with li children', () => {
    render(
      <Box as="ul" data-testid="box">
        <Box as="li">item</Box>
      </Box>,
    );
    expect(screen.getByTestId('box').tagName).toBe('UL');
  });

  it('renders as="li"', () => {
    render(
      <ul>
        <Box as="li" data-testid="box">
          item
        </Box>
      </ul>,
    );
    expect(screen.getByTestId('box').tagName).toBe('LI');
  });

  it('forwards className', () => {
    render(
      <Box data-testid="box" className="custom-class">
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toHaveClass('custom-class');
  });

  it('forwards arbitrary native props — id', () => {
    render(<Box id="my-box">content</Box>);
    expect(document.getElementById('my-box')).toBeInTheDocument();
  });

  it('forwards arbitrary native props — data-testid', () => {
    render(<Box data-testid="my-box">content</Box>);
    expect(screen.getByTestId('my-box')).toBeInTheDocument();
  });

  it('forwards arbitrary native props — aria-label', () => {
    render(<Box aria-label="region">content</Box>);
    expect(screen.getByLabelText('region')).toBeInTheDocument();
  });

  it('forwards ref — current is set after mount', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>content</Box>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });

  it('forwards ref for a non-default element', () => {
    const ref = React.createRef<HTMLElement>();
    render(
      <Box as="section" ref={ref}>
        content
      </Box>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('SECTION');
  });
});

describe('spacing props — padding', () => {
  it('renders with padding={4} without error', () => {
    render(
      <Box data-testid="box" padding={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingX={4} without error', () => {
    render(
      <Box data-testid="box" paddingX={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingY={4} without error', () => {
    render(
      <Box data-testid="box" paddingY={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingTop={4} without error', () => {
    render(
      <Box data-testid="box" paddingTop={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingRight={4} without error', () => {
    render(
      <Box data-testid="box" paddingRight={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingBottom={4} without error', () => {
    render(
      <Box data-testid="box" paddingBottom={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with paddingLeft={4} without error', () => {
    render(
      <Box data-testid="box" paddingLeft={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with individual side overriding axis — paddingLeft={2} with paddingX={4}', () => {
    render(
      <Box data-testid="box" paddingX={4} paddingLeft={2}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with axis overriding all-sides — paddingX={4} with padding={2}', () => {
    render(
      <Box data-testid="box" padding={2} paddingX={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });
});

describe('spacing props — margin', () => {
  it('renders with margin={4} without error', () => {
    render(
      <Box data-testid="box" margin={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginX={4} without error', () => {
    render(
      <Box data-testid="box" marginX={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginY={4} without error', () => {
    render(
      <Box data-testid="box" marginY={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginTop={4} without error', () => {
    render(
      <Box data-testid="box" marginTop={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginRight={4} without error', () => {
    render(
      <Box data-testid="box" marginRight={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginBottom={4} without error', () => {
    render(
      <Box data-testid="box" marginBottom={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with marginLeft={4} without error', () => {
    render(
      <Box data-testid="box" marginLeft={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with individual side overriding axis — marginLeft={2} with marginX={4}', () => {
    render(
      <Box data-testid="box" marginX={4} marginLeft={2}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });

  it('renders with axis overriding all-sides — marginX={4} with margin={2}', () => {
    render(
      <Box data-testid="box" margin={2} marginX={4}>
        content
      </Box>,
    );
    expect(screen.getByTestId('box')).toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it('passes axe for default <div>', async () => {
    const { container } = render(<Box>content</Box>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="nav" with aria-label', async () => {
    const { container } = render(
      <Box as="nav" aria-label="Main navigation">
        content
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="main"', async () => {
    const { container } = render(<Box as="main">content</Box>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('passes axe for as="ul" with li children', async () => {
    const { container } = render(
      <Box as="ul">
        <Box as="li">item one</Box>
        <Box as="li">item two</Box>
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders as="button" with native button semantics intact', () => {
    render(
      <Box as="button" data-testid="box-button" type="button">
        Click me
      </Box>,
    );
    const element = screen.getByTestId('box-button');
    expect(element.tagName).toBe('BUTTON');
    expect(element).toHaveAttribute('type', 'button');
  });

  it('passes axe for as="button"', async () => {
    const { container } = render(
      <Box as="button" type="button">
        Click me
      </Box>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
