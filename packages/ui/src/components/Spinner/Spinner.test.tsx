import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders an svg element', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('is aria-hidden', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('accessibility', () => {
    it('passes axe with default size', async () => {
      const { container } = render(<Spinner />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('passes axe with size sm', async () => {
      const { container } = render(<Spinner size="sm" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('passes axe with size md', async () => {
      const { container } = render(<Spinner size="md" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('passes axe with size lg', async () => {
      const { container } = render(<Spinner size="lg" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
