import type { AxeResults } from 'axe-core';

declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

// Ensure axe-core types are picked up (jest-axe re-exports them)
export type { AxeResults };
