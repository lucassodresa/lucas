import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  describe('rendering', () => {
    it('renders children', () => {
      const { getByTestId } = render(
        <Icon>
          <span data-testid="inner" />
        </Icon>,
      );
      expect(getByTestId('inner')).toBeInTheDocument();
    });

    it('is aria-hidden', () => {
      const { container } = render(<Icon>content</Icon>);
      expect(container.querySelector('span')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('size prop', () => {
    it('renders without size prop (em-based default)', () => {
      const { container } = render(<Icon>content</Icon>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it.each(['sm', 'md', 'lg'] as const)('renders size=%s', (size) => {
      const { container } = render(<Icon size={size}>content</Icon>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });
  });

  describe('color prop', () => {
    it('renders without color prop (inherit default)', () => {
      const { container } = render(<Icon>content</Icon>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('renders color=inherit explicitly', () => {
      const { container } = render(<Icon color="inherit">content</Icon>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it.each(['primary', 'muted', 'success', 'warning', 'danger'] as const)(
      'renders color=%s',
      (color) => {
        const { container } = render(<Icon color={color}>content</Icon>);
        expect(container.querySelector('span')).toBeInTheDocument();
      },
    );
  });

  describe('accessibility', () => {
    it('passes axe with default props', async () => {
      const { container } = render(<Icon>content</Icon>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('passes axe with size and color', async () => {
      const { container } = render(
        <Icon size="md" color="primary">
          content
        </Icon>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
