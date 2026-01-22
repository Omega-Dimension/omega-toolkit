// components/sidebar/hooks/useHoverCard.ts
import { useState, useRef, useCallback } from "react";
import type { MenuItem } from "../data/menuItems";

export interface UseHoverCardProps {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

export const useHoverCard = ({
  collapsed,
  isMobile,
}: UseHoverCardProps) => {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hoverTimer = useRef<number | null>(null);

  const clearTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const handleItemHover = useCallback(
    (item: MenuItem, element: HTMLElement) => {
      clearTimer();

      hoverTimer.current = window.setTimeout(() => {
        if (item.children?.length && collapsed && !isMobile) {
          setHoveredItem(item);
          setAnchorEl(element);
        }
      }, 100);
    },
    [collapsed, isMobile],
  );

  const handleItemLeave = useCallback(() => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  }, []);

  const handleCardEnter = useCallback(() => {
    clearTimer();
  }, []);

  const handleCardLeave = useCallback(() => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  }, []);

  return {
    hoveredItem,
    anchorEl,
    handleItemHover,
    handleItemLeave,
    handleCardEnter,
    handleCardLeave,
  };
};
