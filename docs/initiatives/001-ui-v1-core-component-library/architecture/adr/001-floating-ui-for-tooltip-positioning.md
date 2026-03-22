# ADR 001: Use @floating-ui/react for Tooltip positioning

**Status:** Accepted
**Date:** 2026-03-22
**Ticket:** 001-006 overlays

## Context

The Tooltip component requires that its floating content be positioned relative to its trigger element, with automatic repositioning when the trigger is near a viewport boundary (e.g. the tooltip should flip from above to below when there is insufficient space above). This repositioning logic requires knowledge of element size, scroll position, and viewport boundaries — information that CSS alone cannot act on at runtime.

## Decision

Use `@floating-ui/react` for Tooltip positioning. The component uses:
- `useFloating` hook with `placement: 'top'` as the default
- `flip()` middleware to automatically change placement when the default position overflows the viewport
- `shift({ padding: 8 })` middleware to slide the tooltip along its axis to stay within the viewport

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| CSS-only positioning (`position: absolute`, fixed offsets) | Cannot detect viewport boundaries. Tooltip clips or overflows near viewport edges. |
| Popper.js | Older API, larger bundle. @floating-ui is its direct successor, actively maintained, and has a cleaner hook-based API. |
| Manual JS positioning (getBoundingClientRect + useEffect) | Reimplements what @floating-ui already solves correctly. High maintenance burden. |

## Consequences

**Makes easier:**
- Viewport-aware positioning works automatically — no consumer configuration needed
- Future overlay components (Popover, Select dropdown) can reuse the same library

**Makes harder:**
- Adds a runtime dependency (~10kb gzipped) to the library bundle
- Tests must mock `@floating-ui/react` since jsdom does not support element sizing calculations

**Accepted tradeoff:** The bundle cost is justified by the correctness guarantee. The alternative (broken Tooltip positioning near viewport edges) is a worse consumer experience than a slightly larger bundle.
