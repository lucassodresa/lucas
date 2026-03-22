import { useEffect, useId, useRef, useState } from 'react';

const SHOW_DELAY_MS = 150;
const HIDE_DELAY_MS = 100;

export interface UseTooltipReturn {
  isVisible: boolean;
  tooltipId: string;
  referenceProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

export function useTooltip(): UseTooltipReturn {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (showTimer.current) clearTimeout(showTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const show = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
  };

  const hide = () => {
    if (showTimer.current) clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setIsVisible(false), HIDE_DELAY_MS);
  };

  return {
    isVisible,
    tooltipId,
    referenceProps: {
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
    },
  };
}
