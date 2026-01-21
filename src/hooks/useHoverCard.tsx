import { useState, useRef, useCallback } from "react";
import type { MenuItem } from "../data/menuItems";

interface Params {
  collapsed: boolean;
  isMobile: boolean;
  onClose?: () => void;
}

export function useHoverCard({ collapsed, isMobile }: Params) {
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const timer = useRef<number | null>(null);

  const clear = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // when mouse enters menu item
  const handleItemHover = useCallback(
    (item: MenuItem, el: HTMLElement) => {
      clear();
      timer.current = window.setTimeout(() => {
        if (collapsed && !isMobile && item.children?.length) {
          setHoveredItem(item);
          setAnchorEl(el);
        }
      }, 120);
    },
    [collapsed, isMobile],
  );

  // when mouse leaves menu item
  const handleItemLeave = useCallback(() => {
    clear();
    timer.current = window.setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 150);
  }, []);

  // when mouse enters hover card
  const handleCardEnter = useCallback(() => {
    clear();
  }, []);

  // when mouse leaves hover card
  const handleCardLeave = useCallback(() => {
    clear();
    timer.current = window.setTimeout(() => {
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
}
