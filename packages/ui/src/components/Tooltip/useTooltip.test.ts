import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useTooltip } from './useTooltip';

describe('initial state', () => {
  it('starts with isVisible false', () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.isVisible).toBe(false);
  });

  it('returns a stable tooltipId string', () => {
    const { result } = renderHook(() => useTooltip());
    expect(typeof result.current.tooltipId).toBe('string');
    expect(result.current.tooltipId.length).toBeGreaterThan(0);
  });

  it('returns referenceProps with event handlers', () => {
    const { result } = renderHook(() => useTooltip());
    expect(typeof result.current.referenceProps.onMouseEnter).toBe('function');
    expect(typeof result.current.referenceProps.onMouseLeave).toBe('function');
    expect(typeof result.current.referenceProps.onFocus).toBe('function');
    expect(typeof result.current.referenceProps.onBlur).toBe('function');
  });
});

describe('show delay', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show before 150ms', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(149));
    expect(result.current.isVisible).toBe(false);
  });

  it('shows after 150ms on mouseenter', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.isVisible).toBe(true);
  });

  it('shows after 150ms on focus', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onFocus());
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.isVisible).toBe(true);
  });
});

describe('hide delay', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('hides after 100ms on mouseleave', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.isVisible).toBe(true);
    act(() => result.current.referenceProps.onMouseLeave());
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isVisible).toBe(false);
  });

  it('hides after 100ms on blur', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onFocus());
    act(() => vi.advanceTimersByTime(150));
    act(() => result.current.referenceProps.onBlur());
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isVisible).toBe(false);
  });

  it('cancels the show timer when hide is triggered before 150ms', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(100));
    act(() => result.current.referenceProps.onMouseLeave());
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.isVisible).toBe(false);
  });
});

describe('re-show while hide is pending', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('cancels a pending hide timer when show is called again', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(150));
    expect(result.current.isVisible).toBe(true);
    act(() => result.current.referenceProps.onMouseLeave());
    act(() => result.current.referenceProps.onMouseEnter());
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isVisible).toBe(true);
  });
});

describe('timer cleanup', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('clears timers on unmount without throwing', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result, unmount } = renderHook(() => useTooltip());
    act(() => result.current.referenceProps.onMouseEnter());
    expect(() => unmount()).not.toThrow();
  });
});
